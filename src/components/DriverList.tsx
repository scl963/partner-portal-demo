import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { DriverData } from '../types';
import { DRIVER_QUERY } from '../queries';
import LoadingPage from './LoadingPage/LoadingPage';
import GenericContainer from './GenericContainer';

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
    return (
      <GenericContainer title="Active Sheprd Drivers">
        <ActiveDriverQuery query={DRIVER_QUERY}>
          {({ loading, data, error }) => {
            if (loading) {
              return <LoadingPage />;
            }

            if (error) {
              return `Error loading driver list. Please try refreshing the page.`;
            }

            if (data) {
              const tableData = data.allMembers;
              return (
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
                    scroll={{ y: 700 }}
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
      </GenericContainer>
    );
  }
}

export default DriverList;
