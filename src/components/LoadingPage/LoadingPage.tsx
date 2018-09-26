import React, { SFC } from 'react';
import { Icon } from 'antd';

const LoadingPage: SFC = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '20em',
      }}
    >
      <Icon type="loading" style={{ fontSize: '60px', display: 'inline-block' }} />
    </div>
  );
};

export default LoadingPage;
