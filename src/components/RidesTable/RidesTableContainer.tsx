import moment, { Moment } from 'moment';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { RideDataOnLocation, Ride, TableData, GenericComponentProps } from '../../types';
import RidesTable from './RidesTable';
import TableTools from './TableTools/TableTools';
import { RIDES_QUERY } from './queries';
import { filterTimes, compressRide } from '../utils';
import LoadingPage from '../LoadingPage/LoadingPage';
import GenericContainer from '../GenericContainer';

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
  printView: boolean;
}>;

interface Variables {
  start: string;
  end: string;
  locationId: string;
}

class RidesForDayQuery extends Query<RideDataOnLocation, Variables> {}

class RidesTableContainer extends Component<GenericComponentProps, State> {
  readonly state: State = {
    startDate: today,
    endDate: tomorrow,
    filter: { times: 'allTimes', types: 'allTypes' },
    searchValue: '',
    printView: false,
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

  private print = async () => {
    await this.setState({ printView: true });
    window.print();
    this.setState({ printView: false });
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
  private formatStudentRoster(pickupRides: Ride[], dropOffRides: Ride[]) {
    const dropoffs = dropOffRides.map(ride => {
      return compressRide(ride, 'Dropoff');
    });
    const pickups = pickupRides.map(ride => {
      return compressRide(ride, 'Pickup');
    });
    return dropoffs.concat(pickups);
  }

  private renderStudentRoster() {
    const { startDate, endDate } = this.state;
    const { locationId, locationTitle } = this.props;
    return (
      <GenericContainer title={`${locationTitle} Daily Roster`}>
        <TableTools
          day={moment(startDate).format('dddd, MMMM Do')}
          moveDate={this.moveDate}
          changeFilter={this.changeFilter}
          handleSearch={this.handleSearch}
          handleDatePicker={this.handleDatePicker}
          print={this.print}
        />
        <RidesForDayQuery
          query={RIDES_QUERY}
          variables={{ start: startDate, end: endDate, locationId }}
          pollInterval={1000 * 60 * 3}
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
              const { searchValue, printView } = this.state;
              const formattedData = this.formatStudentRoster(pickupRides, dropOffRides);
              const tableData = this.applyFilters(formattedData);
              return (
                <div id="rideTableWrapper">
                  <RidesTable
                    data={tableData}
                    searchValue={searchValue}
                    loading={loading}
                    printView={printView}
                  />
                </div>
              );
            } else {
              return <div>There is no data to display</div>;
            }
          }}
        </RidesForDayQuery>
      </GenericContainer>
    );
  }

  render() {
    return <div>{this.props.locationId && this.renderStudentRoster()}</div>;
  }
}

export default RidesTableContainer;
