import React, { Component } from 'react';
import { Table, Icon, TimePicker } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { outputRideType } from '../utils';
import Fuse from 'fuse.js';

interface RidesTableProps {
  data: TableData[];
  searchValue: string;
  loading: boolean;
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
    const { data, searchValue } = this.props;
    let tableData: TableData[] = data;
    // Search by student name implemented here
    if (searchValue.length) {
      const options = {
        keys: ['student'],
        minMatchCharLength: 2,
        distance: 100,
        threshold: 0.2,
        maxPatternLength: 32,
      };
      const fuse = new Fuse(tableData, options);
      tableData = fuse.search(searchValue);
    }

    return (
      <AntTable pagination={false} rowKey="id" columns={this.columns()} dataSource={tableData} />
    );
  }
}

export default RidesTable;
