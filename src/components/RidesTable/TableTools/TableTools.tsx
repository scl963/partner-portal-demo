import React, { SFC } from 'react';
import { Icon, Row, Select, Input, DatePicker } from 'antd';
import './TableTools.css';
import { Moment } from 'moment';

const { Option } = Select;
const { Search } = Input;

interface ToolsProps {
  day: string;
  moveDate: (direction: string) => void;
  changeFilter: (property: string, value: any) => void;
  handleSearch: (searchValue: string) => void;
  handleDatePicker: (date: Moment) => void;
}

const TableTools: SFC<ToolsProps> = props => {
  return (
    <div className="tools-container">
      <Row type="flex" justify="start" style={{ margin: '1em' }}>
        <DatePicker allowClear={false} onChange={e => props.handleDatePicker(e)} />
      </Row>
      <Row type="flex" justify="start">
        <div style={{ margin: '1em' }}>
          <Select
            defaultValue="allTimes"
            style={{ width: 194, marginRight: '1em' }}
            onChange={(value: any) => props.changeFilter('times', value)}
          >
            <Option value="allTimes">All Times</Option>
            <Option value="morning">Morning</Option>
            <Option value="afternoon">Afternoon</Option>
          </Select>
          <Select
            defaultValue="allTypes"
            style={{ width: 194 }}
            onChange={(value: any) => props.changeFilter('types', value)}
          >
            <Option value="allTypes">All Ride Types</Option>
            <Option value="pickups">Pickups</Option>
            <Option value="dropoffs">Dropoffs</Option>
          </Select>
        </div>
        <div className="day-shifter">
          <Icon type="left" className="day-shifter-icon" onClick={() => props.moveDate('left')} />
          <h2>{props.day}</h2>
          <Icon type="right" className="day-shifter-icon" onClick={() => props.moveDate('right')} />
        </div>
        <Search
          id="search-input"
          size="default"
          placeholder="Search Passengers"
          onChange={(evt: any) => props.handleSearch(evt.target.value)}
          style={{ width: 194, margin: '1em', marginLeft: 'auto' }}
        />
      </Row>
    </div>
  );
};

export default TableTools;
