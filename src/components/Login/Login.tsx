import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card, Avatar } from 'antd';
import SheprdIcon from '../../common/img/sheprd_icon.png';
import SheprdLogo from '../../common/img/sheprd_logo.png';
import './Login.css';

const FormItem = Form.Item;

type State = Readonly<{
  email: string;
  password: string;
}>;

class Login extends Component<{}, State> {
  state: State = {
    email: '',
    password: '',
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Hello!');
    console.log(e.target.value);
  };

  render() {
    return (
      <div className="login-page-container">
        <div className="logo-container">
          <img src={SheprdLogo} className="sheprd-logo" />
          <h1 className="logo-text">Partner Portal</h1>
        </div>
        <Avatar src={SheprdIcon} shape="square" className="login-sheprd-icon" />
        <Card
          className="signup-login-card"
          style={{
            maxWidth: '320px',
            margin: 'auto',
            marginTop: '0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="login-card-head">
              <h2>Log In to Sheprd</h2>
            </div>
            <FormItem>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="email"
                name="email"
                placeholder="Enter your email"
                className="login-signup-field-width-half"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="login-signup-field-width-half"
              />
            </FormItem>
            <FormItem className=".login-signup-field-width-half">
              <Button type="primary" htmlType="submit" className="login-submit-button">
                Log in
              </Button>
              <div>
                <a className="login-form-forgot" href="">
                  I forgot my password
                </a>
              </div>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Login;
