import moment from 'moment';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Icon } from 'antd';
import { Data, Ride, TableData } from '../../types';
import RidesTable from './RidesTable';
import TableTools from './TableTools';
import { RIDES_QUERY } from './queries';
import { filterTimes, compressRide } from '../utils';

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

interface Variables {
  start: string;
  end: string;
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

  render() {
    const { startDate, endDate, filter } = this.state;
    return (
      <div>
        <TableTools
          day={moment(startDate).format('dddd, MMMM Do')}
          moveDate={this.moveDate}
          changeFilter={this.changeFilter}
          handleSearch={this.handleSearch}
        />
        <RidesForDayQuery query={RIDES_QUERY} variables={{ start: startDate, end: endDate }}>
          {({ loading, data, error }) => {
            if (loading) {
              return (
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <Icon type="loading" style={{ fontSize: '60px', textAlign: 'center' }} />
                </div>
              );
            }

            if (error) {
              return `Error! ${error.message}`;
            }

            if (data) {
              const { title, pickupRides, dropOffRides } = data.Location;
              const { searchValue } = this.state;
              const formattedData = this.formatTableData(pickupRides, dropOffRides);
              const tableData = this.applyFilters(formattedData);
              return (
                <div>
                  <div style={{ textAlign: 'center' }}>
                    <h1>{title} Daily Roster</h1>
                  </div>
                  <RidesTable data={tableData} searchValue={searchValue} />
                </div>
              );
            } else {
              return <div>There is no data to display</div>;
            }
          }}
        </RidesForDayQuery>
      </div>
    );
  }
}

export default RidesTableContainer;
