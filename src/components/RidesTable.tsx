import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { Data, Ride, PickupMember } from '../types';
import { Table, Icon, TimePicker } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';

interface RidesTableProps {
  data: Data | undefined;
}

type State = Readonly<{
  num: number;
}>;

interface TableData {
  date: string;
  type: string;
  student: string;
  pickupRangeStart: string;
  pickupRangeEnd: string;
}

function outputRideType(type: string) {
  const direction = type === 'Pickup' ? 'arrow-up' : 'arrow-down';
  const color = type === 'Pickup' ? '#ffdb7a' : '#089111';
  return (
    <div>
      <div>
        <Icon type={direction} style={{ color, fontSize: '32px' }} />
      </div>
      <div>{type}</div>
    </div>
  );
}

function compressRide(ride: Ride, type: string) {
  const { id, pickupRangeStart, pickupRangeEnd, route } = ride;
  let driver: string | null = 'N/A';
  let carName: string | null = 'N/A';
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
    date,
    type,
    student,
    pickupRangeStart: startTime,
    pickupRangeEnd: endTime,
    carName,
    driver,
  };
}

class AntTable extends Table<TableData> {}

class RidesTable extends Component<RidesTableProps, State> {
  readonly state: State = {
    num: 0,
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

  private columns = (): Array<ColumnProps<TableData>> => [
    {
      dataIndex: 'type',
      title: 'Ride Type',
      render: type => outputRideType(type),
      width: 150,
    },
    {
      dataIndex: 'student',
      title: 'Passenger',
      width: 150,
    },
    {
      dataIndex: 'driver',
      title: 'Driver',
      width: 150,
    },
    {
      dataIndex: 'carName',
      title: 'Vehicle',
      width: 150,
    },
    {
      dataIndex: 'pickupRangeStart',
      title: 'Arrival',
      width: 150,
    },
    {
      dataIndex: 'pickupRangeEnd',
      title: 'Departure',
      width: 150,
    },
  ];

  public render() {
    if (!this.props.data) {
      return <div>Loading</div>;
    }

    const { pickupRides, dropOffRides } = this.props.data.Location;
    console.log(this.formatTableData(pickupRides, dropOffRides));
    return (
      <AntTable
        pagination={false}
        rowKey="id"
        columns={this.columns()}
        dataSource={this.formatTableData(pickupRides, dropOffRides)}
      />
    );
  }
}

export default RidesTable;
