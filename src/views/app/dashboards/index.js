import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Statistic = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./tweet")
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/statistic`} />

      <Route
        path={`${match.url}/statistic`}
        render={(props) => <Statistic {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
