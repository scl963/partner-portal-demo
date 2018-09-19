import moment from 'moment';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { Icon } from 'antd';
import { Data, Ride } from '../types';
import RidesTable, { TableData } from './RidesTable';
import TableTools from './TableTools';
import { RIDES_QUERY } from './queries';
import { SelectValue } from 'antd/lib/select';

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
}>;

interface Variables {
  start: string;
  end: string;
}

class RidesForDayQuery extends Query<Data, Variables> {}

function filterTimes(rides: TableData[], timeFilter: string) {
  console.log(timeFilter);
  if (timeFilter === 'morning') {
    return rides.filter(ride => Number(ride.pickupRangeStart.slice(0, 2)) < 12);
  } else if (timeFilter === 'afternoon') {
    return rides.filter(ride => Number(ride.pickupRangeStart.slice(0, 2)) > 12);
  } else {
    return rides;
  }
}

function compressRide(ride: Ride, type: string) {
  const { id, pickupRangeStart, pickupRangeEnd, route, status } = ride;
  let driver: string | null = 'N/A';
  let carName: string | null = 'N/A';
  // This isn't ideal -- would like to replace with optional chaining if possible
  if (route) {
    if (route.shift) {
      if (route.shift.members) {
        driver = route.shift.members[0].firstName;
      }
      if (route.shift.vehicles) {
        carName = route.shift.vehicles[0].carName;
      }
    }
  }
  const student = `${ride.pickupMember.firstName} ${ride.pickupMember.lastName}`;
  const startTime = moment(pickupRangeStart).format('HH:mm');
  const endTime = moment(pickupRangeEnd).format('HH:mm');
  const date = moment(pickupRangeStart).format('YYYY-MM-DD');
  return {
    id,
    status,
    date,
    type,
    student,
    pickupRangeStart: startTime,
    pickupRangeEnd: endTime,
    carName,
    driver,
  };
}

class RidesTableContainer extends Component<{}, State> {
  readonly state: State = {
    startDate: today,
    endDate: tomorrow,
    filter: { times: 'allTimes', types: 'allTypes' },
  };

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

  private changeFilter = (property: string, evt: any) => {
    console.log(evt);
    const { filter } = this.state;
    filter[property] = evt;
    this.setState({ filter });
  };

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

            console.log(data);
            if (data) {
              const { title, pickupRides, dropOffRides } = data.Location;
              const formattedData = this.formatTableData(pickupRides, dropOffRides);
              const tableData = this.applyFilters(formattedData);
              return (
                <div>
                  <div style={{ textAlign: 'center' }}>
                    <h1>{title} Daily Roster</h1>
                  </div>
                  <RidesTable data={tableData} />
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
