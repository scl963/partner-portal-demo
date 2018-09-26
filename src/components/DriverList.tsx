import React, { SFC } from 'react';
import { Query } from 'react-apollo';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { DriverData } from '../types';
import { DRIVER_QUERY } from './RidesTable/queries';
import LoadingPage from './LoadingPage/LoadingPage';

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

const DriverList: SFC = () => {
  return (
    <ActiveDriverQuery query={DRIVER_QUERY}>
      {({ loading, data, error }) => {
        if (loading) {
          return <LoadingPage />;
        }

        if (error) {
          return `Error! ${error.message}`;
        }

        if (data) {
          const tableData = data.allMembers;
          return (
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
              <Table
                pagination={false}
                rowKey="id"
                size="small"
                scroll={{ y: 700, x: 600 }}
                columns={columns}
                dataSource={tableData}
              />
            </div>
          );
        } else {
          return <p>Error loading driver list. Please try refreshing the page.</p>;
        }
      }}
    </ActiveDriverQuery>
  );
};

export default DriverList;
