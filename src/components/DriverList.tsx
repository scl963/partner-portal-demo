import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { DriverData } from '../types';
import { DRIVER_QUERY } from '../queries';
import LoadingPage from './LoadingPage/LoadingPage';
import GenericContainer from './GenericContainer';
import { mockDriverData } from './MockData';

class ActiveDriverQuery extends Query<DriverData> {}

const columns: Array<ColumnProps<any>> = [
  {
    dataIndex: 'firstName',
    title: 'First Name',
    width: 150,
    align: 'center',
  },
  {
    dataIndex: 'lastName',
    title: 'Last Name',
    width: 150,
    align: 'center',
  },
];

class DriverList extends Component {
  render() {
    const antHeight: number = innerHeight < 800 ? innerHeight * 0.6 : 700;
    const { data } = mockDriverData;
    const tableData = data.allMembers;
    console.log(tableData);
    return (
      <GenericContainer title="Active Sheprd Drivers">
        <div
          style={{
            marginBottom: '20px',
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Table
            pagination={false}
            rowKey="id"
            size="small"
            style={{ width: '500px' }}
            scroll={{ y: antHeight }}
            columns={columns}
            dataSource={tableData}
          />
        </div>
      </GenericContainer>
    );
  }
}

export default DriverList;
