import React, { Component } from 'react';
import { Table, Icon, TimePicker } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { outputRideType } from '../utils';
import Fuse from 'fuse.js';
import { TableData } from '../../types';
import './RidesTable.css';

interface RidesTableProps {
  data: TableData[];
  searchValue: string;
  printView: boolean;
}

type State = Readonly<{
  tableData: TableData[];
}>;

interface MyElement extends HTMLElement {
  offsetHeight: number;
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
      width: 100,
      align: 'center',
    },
    {
      dataIndex: 'status',
      title: 'Status',
      width: 150,
      align: 'center',
    },
    {
      dataIndex: 'student',
      title: 'Passenger',
      width: 150,
      align: 'center',
    },
    {
      dataIndex: 'driver',
      title: 'Driver',
      width: 150,
      align: 'center',
    },
    {
      dataIndex: 'carName',
      title: 'Vehicle',
      width: 150,
      align: 'center',
    },
    {
      dataIndex: 'licensePlate',
      title: 'License Plate',
      width: 150,
      align: 'center',
    },
    {
      dataIndex: 'pickupRangeStart',
      title: 'Arrival',
      width: 150,
      align: 'center',
    },
    {
      dataIndex: 'pickupRangeEnd',
      title: 'Departure',
      width: 150,
      align: 'center',
    },
  ];

  public render() {
    const { data, searchValue } = this.props;
    const { innerHeight } = window;
    const antHeight: number = innerHeight < 800 ? innerHeight * 0.5 : 600;
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
    const scroll = this.props.printView ? { x: false, y: false } : { x: 600, y: antHeight };

    return (
      <div>
        <AntTable
          rowClassName={(record, index) => {
            return record.status === 'Canceled' ? 'canceled-row' : '';
          }}
          pagination={false}
          rowKey="id"
          size="small"
          scroll={scroll}
          columns={this.columns()}
          dataSource={tableData}
        />
      </div>
    );
  }
}

export default RidesTable;
