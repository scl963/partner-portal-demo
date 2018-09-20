import React, { Component, SFC } from 'react';
import { Icon, Row, Select, Button, Input } from 'antd';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;
const { Search } = Input;

interface ToolsProps {
  day: string;
  moveDate: (direction: string) => void;
  changeFilter: (property: string, value: any) => void;
  handleSearch: (searchValue: string) => void;
}

const TableTools: SFC<ToolsProps> = props => {
  return (
    <Row type="flex" justify="center">
      <Select
        defaultValue="allTimes"
        style={{ width: 200 }}
        onChange={(value: any) => props.changeFilter('times', value)}
      >
        <Option value="allTimes">All Times</Option>
        <Option value="morning">Morning</Option>
        <Option value="afternoon">Afternoon</Option>
      </Select>
      <Select
        defaultValue="allTypes"
        style={{ width: 200 }}
        onChange={(value: any) => props.changeFilter('types', value)}
      >
        <Option value="allTypes">All Ride Types</Option>
        <Option value="pickups">Pickups</Option>
        <Option value="dropoffs">Dropoffs</Option>
      </Select>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => props.moveDate('left')}>
          <Icon type="left" style={{ fontSize: '16px' }} />
        </Button>
        <h2>{props.day}</h2>
        <Button onClick={() => props.moveDate('right')}>
          <Icon type="right" style={{ fontSize: '16px' }} />
        </Button>
      </div>
      <Search
        id="search-input"
        size="default"
        placeholder="Search Passengers"
        onChange={(evt: any) => props.handleSearch(evt.target.value)}
        style={{ width: 200 }}
      />
    </Row>
  );
};

export default TableTools;
