import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card, Avatar } from 'antd';
import axios from 'axios';
import { ApolloConsumer } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { Formik } from 'formik';
import { RouteComponentProps, Redirect } from 'react-router';
import SheprdIcon from '../../common/img/sheprd_icon.png';
import SheprdLogo from '../../common/img/sheprd_logo.png';
import { handleToken, isAuthenticated } from '../../utils/authUtils';
import { userQuery } from '../../common/queries';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

const loginURL = `${env.REACT_APP_SERVER_DOMAIN}/loginUser`;

type State = Readonly<{ showForgotForm: boolean }>;

const ERROR_MESSAGE = {
  EMAIL_REQUIRED: 'Email required',
  INVALID_EMAIL_ADDRESS: 'Invalid email addresss',
};

const validateEmail = values => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = ERROR_MESSAGE.EMAIL_REQUIRED;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ERROR_MESSAGE.INVALID_EMAIL_ADDRESS;
  }
  return errors;
};

import './Login.css';

const FormItem = Form.Item;

interface Props extends RouteComponentProps<any> {
  onAuthenticated(): void;
}

class Login extends Component<Props> {
  state: State = { showForgotForm: false };

  private handleSubmit = (client: ApolloClient<any>) => async (
    { email, password },
    { setSubmitting, setFieldError },
  ) => {
    try {
      //   const res = await axios.post(loginURL, {
      //     email,
      //     password,
      //   });
      //   const { token } = res.data;
      handleToken(client, 'TEST.TOKEN12343');
      //   const {
      //     data: { user },
      //   } = await client.query<any>({
      //     query: userQuery,
      //   });
      await this.props.onAuthenticated();
      //   // Timeout needed to allow location query to fire
      // await setTimeout(() => null, 200);
      return <Redirect to="/daily-roster" />;
    } catch (e) {
      console.error(e);
      return <Redirect to="login" />;
    }
  };

  private renderLogin() {
    return isAuthenticated() ? (
      <Redirect to="/daily-roster" />
    ) : (
      <ApolloConsumer>
        {client => (
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={validateEmail}
            validateOnChange={false}
            onSubmit={this.handleSubmit(client)}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
              return (
                <Form onSubmit={handleSubmit} className="login-form">
                  <div className="login-card-head">
                    <h2>Log In to Sheprd</h2>
                  </div>
                  <FormItem>
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Email"
                      className="login-signup-field-width-half"
                    />
                  </FormItem>
                  <FormItem>
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                      className="login-signup-field-width-half"
                    />
                  </FormItem>
                  <FormItem className=".login-signup-field-width-half">
                    <Button
                      loading={isSubmitting}
                      type="primary"
                      htmlType="submit"
                      className="login-submit-button"
                    >
                      Log in
                    </Button>
                    <div>
                      <a
                        className="login-form-forgot"
                        href="https://ride.sheprd.com/reset-password"
                      >
                        I forgot my password
                      </a>
                    </div>
                  </FormItem>
                </Form>
              );
            }}
          </Formik>
        )}
      </ApolloConsumer>
    );
  }

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
          {this.renderLogin()}
        </Card>
      </div>
    );
  }
}

export default Login;
