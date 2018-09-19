import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { Data, Ride, PickupMember } from '../types';
import { Table, Icon, TimePicker } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';

interface RidesTableProps {
  data: TableData[];
}

type State = Readonly<{
  tableData: TableData[];
}>;

export interface TableData {
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

class AntTable extends Table<TableData> {}

class RidesTable extends Component<RidesTableProps, State> {
  readonly state: State = {
    tableData: [],
  };

  private columns = (): Array<ColumnProps<TableData>> => [
    {
      dataIndex: 'type',
      title: 'Ride Type',
      render: type => outputRideType(type),
      width: 150,
    },
    {
      dataIndex: 'status',
      title: 'Status',
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
    return (
      <AntTable
        pagination={false}
        rowKey="id"
        columns={this.columns()}
        dataSource={this.props.data}
      />
    );
  }
}

export default RidesTable;
