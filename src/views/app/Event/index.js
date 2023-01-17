// import React, { Suspense } from 'react';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import Event from './Event';
// import EventInfo from './EventInfo';

// export default function EventIndex({ match }) {
// 	console.log(match.url);
// 	return (
// 		<Switch>
// 			<Suspense fallback={<div className='loading' />}>
// 				<Redirect from={`${match.url}/`} to={`${match.url}`} />
// 				<Route path={`${match.url}/`} component={Event} />
// 			</Suspense>
// 		</Switch>
// 	);
// }
