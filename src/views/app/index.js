import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from '../../layout/AppLayout';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards'),
);

const Event = React.lazy(() => import('./Event/Event'));
const MeetingRoom = React.lazy(() => import('./MeetingRoom'));
const MasterUser = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './account/user'),
);

const MasterOfficer = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './officer'),
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className='dashboard-wrapper'>
        <Suspense fallback={<div className='loading' />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />

            <Route
              path={`${match.url}/meeting-room`}
              render={(props) => <MeetingRoom {...props} />}
            />
            <Route
              path={`${match.url}/master-member`}
              render={(props) => <MasterOfficer {...props} />}
            />
            <Route
              path={`${match.url}/event`}
              render={(props) => <Event {...props} />}
            />

            <Route
              path={`${match.url}/account-setting`}
              render={(props) => <MasterUser {...props} />}
            />

            <Redirect to='/error' />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
