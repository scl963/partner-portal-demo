import moment, { Moment } from 'moment';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { css } from 'react-emotion';
import { Data, Ride, TableData } from '../../types';
import RidesTable from './RidesTable';
import TableTools from './TableTools/TableTools';
import { RIDES_QUERY } from './queries';
import { filterTimes, compressRide } from '../utils';
import { getLocation, getLocationTitle } from '../../utils/authUtils';
import LoadingPage from '../LoadingPage/LoadingPage';

const today: string = moment().format('YYYY-MM-DD');
const tomorrow: string = moment()
  .add(1, 'day')
  .format('YYYY-MM-DD');

export interface Filter {
  times: string;
  types: string;
}

type State = Readonly<{
  startDate: string;
  endDate: string;
  filter: Filter;
  searchValue: string;
}>;

const locationId = getLocation();
const locationTitle = getLocationTitle();

interface Variables {
  start: string;
  end: string;
  locationId: string;
}

class RidesForDayQuery extends Query<Data, Variables> {}

class RidesTableContainer extends Component<{}, State> {
  readonly state: State = {
    startDate: today,
    endDate: tomorrow,
    filter: { times: 'allTimes', types: 'allTypes' },
    searchValue: '',
  };

  // This method is triggered by arrow buttons next to the date and moves start and end date by one
  // day at a time in either direction
  private moveDate = (direction: string) => {
    const newDate = moment(this.state.startDate);
    if (direction === 'left') {
      newDate.subtract(1, 'day');
    } else {
      newDate.add(1, 'day');
    }
    const startDate = newDate.format('YYYY-MM-DD');
    const endDate = newDate.add(1, 'day').format('YYYY-MM-DD');
    this.setState({
      startDate,
      endDate,
    });
  };

  private handleDatePicker = (date: Moment) => {
    const startDate = date.format('YYYY-MM-DD');
    const endDate = moment(startDate)
      .add(1, 'day')
      .format('YYYY-MM-DD');
    this.setState({ startDate, endDate });
  };

  private handleSearch = (searchValue: string) => {
    this.setState({ searchValue });
  };

  // Property controls which state filter is changed. Value comes from the select menus and gets
  // passed in as the new filter option
  private changeFilter = (property: string, value: any) => {
    const { filter } = this.state;
    filter[property] = value;
    this.setState({ filter });
  };

  // This filters first by ride type, then passes all rides of that type to the time filter function
  private applyFilters = (tableData: TableData[]) => {
    const { filter } = this.state;
    if (filter.types === 'allTypes' && filter.times === 'allTimes') {
      return tableData;
    }
    if (filter.types === 'pickups') {
      const pickups = tableData.filter(ride => ride.type === 'Pickup');
      return filterTimes(pickups, filter.times);
    } else if (filter.types === 'dropoffs') {
      const dropoffs = tableData.filter(ride => ride.type === 'Dropoff');
      return filterTimes(dropoffs, filter.times);
    } else {
      return filterTimes(tableData, filter.times);
    }
  };

  // Combines pickups and dropoffs and formats data for Ant Table component
  private formatTableData(pickupRides: Ride[], dropOffRides: Ride[]) {
    const dropoffs = dropOffRides.map(ride => {
      return compressRide(ride, 'Dropoff');
    });
    const pickups = pickupRides.map(ride => {
      return compressRide(ride, 'Pickup');
    });
    return dropoffs.concat(pickups);
  }

  private renderTable() {
    const { startDate, endDate } = this.state;
    return (
      <div
        className={css`
          display: flex;
          align-items: center;
          flex-direction: column;
          max-height: 100vh @media (max-width: 1366px) {
            min-width: 100vw;
          }
          @media (max-height: 800) {
            min-height: 100%;
            max-height: 100%;
          }
        `}
      >
        <h2 style={{ margin: '.5em' }}>{`${locationTitle} Daily Roster`}</h2>
        <div
          className={css`
            width: 80vw;
            min-height: 80vh;
            max-height: 80vh;
            margin-bottom: 160px;
            background: white;
            border-radius: 1.5em;
            @media (max-width: 1366px) {
              min-width: 100vw;
              border-radius: 1.5em;
            }
            @media (max-height: 800) {
              min-height: 100%;
              max-height: 100%;
            }
          `}
        >
          <TableTools
            day={moment(startDate).format('dddd, MMMM Do')}
            moveDate={this.moveDate}
            changeFilter={this.changeFilter}
            handleSearch={this.handleSearch}
            handleDatePicker={this.handleDatePicker}
          />
          <RidesForDayQuery
            query={RIDES_QUERY}
            variables={{ start: startDate, end: endDate, locationId }}
          >
            {({ loading, data, error }) => {
              if (loading) {
                return <LoadingPage />;
              }

              if (error) {
                return `Error! ${error.message}`;
              }

              if (data) {
                const { pickupRides, dropOffRides } = data.Location;
                const { searchValue } = this.state;
                const formattedData = this.formatTableData(pickupRides, dropOffRides);
                const tableData = this.applyFilters(formattedData);
                return (
                  <div>
                    <RidesTable data={tableData} searchValue={searchValue} loading={loading} />
                  </div>
                );
              } else {
                return <div>There is no data to display</div>;
              }
            }}
          </RidesForDayQuery>
        </div>
      </div>
    );
  }

  render() {
    return locationId !== null && this.renderTable();
  }
}

export default RidesTableContainer;
