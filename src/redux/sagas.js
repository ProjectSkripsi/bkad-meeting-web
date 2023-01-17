import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todoSagas from './todo/saga';

import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';
import officerSagas from './officer/saga';
import meetingRoom from './MeetingRoom/saga';

export default function* rootSaga(getState) {
	yield all([
		authSagas(),
		todoSagas(),
		surveyListSagas(),
		surveyDetailSagas(),
		officerSagas(),
		meetingRoom(),
	]);
}
