import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import officer from './officer/reducer';
import meetingRoom from './MeetingRoom/reducer';

const reducers = combineReducers({
	menu,
	settings,
	authUser,
	todoApp,
	surveyListApp,
	surveyDetailApp,
	officer,
	meetingRoom,
});

export default reducers;
