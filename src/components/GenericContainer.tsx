import React, { SFC } from 'react';
import { tablePageStyle, tableContainerStyle } from './styles';

interface GenericContainerProps {
  title: string;
  children: any;
}

// This container formats any content in an inset box with a title displayed above
// Apollo queries and loading screen should be placed inside the container
// to prevent entire page rerenders and keep UI constant
const GenericContainer: SFC<GenericContainerProps> = props => {
  return (
    <div className={tablePageStyle}>
      <h2 style={{ margin: '.5em' }}>{props.title}</h2>
      <div className={tableContainerStyle}>{props.children}</div>
    </div>
  );
};

export default GenericContainer;
