import React, { useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import authAction from '@iso/redux/auth/actions';
import appAction from '@iso/redux/app/actions';
import SignInStyleWrapper from './SignIn.styles';
import { Alert } from 'antd';

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  const { isLoggedIn, error_message } = useSelector(state => {
    return {
      isLoggedIn: state.Auth.idToken,
      error_message: state.Auth.error_message
    }
  });

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [credentials, setCredentials] = useState({email: "", password: ""});

  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  const onRecordChange = (e, key) => {
    const newData = {
      ...credentials,
      [key]: e.target.value
    }
    setCredentials(newData);
  }

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login(credentials));
    dispatch(clearMenu());
    history.push('/staff/dashboard/markets');
  }
  let { from } = location.state || { from: { pathname: '/staff/dashboard/markets' } };
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/staff/dashboard/markets">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">

            { error_message ? <Alert message={error_message} type="error" style={{marginBottom: 10}}/> : "" }
            
            <form>
              <div className="isoInputWrapper">
                <Input
                  value={credentials.email}
                  size="large"
                  placeholder="Email Address"
                  autoComplete="true"
                  onChange={e => onRecordChange(e, 'email')}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  value={credentials.password}
                  type="password"
                  placeholder="Password"
                  autoComplete="false"
                  onChange={e => onRecordChange(e, 'password')}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" onClick={e => handleLogin(e)}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
