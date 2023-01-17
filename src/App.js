import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { isEmpty } from 'lodash';
import './helpers/Firebase';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import { isMultiColorActive, adminRoot } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import { ProtectedRoute } from './helpers/authHelper';

const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home'),
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app'),
);

const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error'),
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized'),
);
const ViewLogin = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user/login'),
);

const ViewPdf = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/rekap/id'),
);

class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale, isLogin } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className='h-100'>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className='loading' />}>
              <Router>
                <Switch>
                  <ProtectedRoute
                    path={adminRoot}
                    component={ViewApp}
                    isLogin={isLogin}
                  />
                  <Redirect from='/' to='/login' exact />
                  <Route
                    path='/login'
                    render={(props) => <ViewLogin {...props} isLogin={isLogin} />}
                  />
                  <Route
                    path='/error'
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path='/unauthorized'
                    exact
                    render={(props) => <ViewUnauthorized {...props} />}
                  />
                  <Route
                    path='/rekapitulasi/:id'
                    exact
                    render={(props) => <ViewPdf {...props} />}
                  />
                  <Redirect to='/error' />
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  const isLogin = !isEmpty(currentUser);

  return { currentUser, locale, isLogin };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
