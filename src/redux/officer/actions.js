import {
	ADD_NEW_OFFICER_REQUEST,
	ADD_NEW_OFFICER_SUCCESS,
	ADD_NEW_OFFICER_ERROR,
	DELETE_OFFICER_REQUEST,
	DELETE_OFFICER_SUCCESS,
	DELETE_OFFICER_ERROR,
	UPDATE_OFFICER_REQUEST,
	UPDATE_OFFICER_SUCCESS,
	UPDATE_OFFICER_ERROR,
} from '../actions';

export const addOfficerRequest = (
	name,
	email,
	password,
	avatarUrl,
	unit,
	callBack,
) => ({
	type: ADD_NEW_OFFICER_REQUEST,
	payload: { name, email, password, avatarUrl, unit, callBack },
});

export const addOfficerSuccess = (response, types) => ({
	type: ADD_NEW_OFFICER_SUCCESS,
	payload: { response, types },
});

export const addOfficerFailure = (error) => ({
	type: ADD_NEW_OFFICER_ERROR,
	payload: { error },
});

export const deleteRequest = (_id, callBack) => ({
	type: DELETE_OFFICER_REQUEST,
	payload: { _id, callBack },
});

export const deleteSuccess = (response) => ({
	type: DELETE_OFFICER_SUCCESS,
	payload: { response },
});

export const deleteFailure = (error) => ({
	type: DELETE_OFFICER_ERROR,
	payload: { error },
});

export const updateOfficerRequest = (
	_id,
	name,
	email,
	avatarUrl,
	unit,
	callBack,
) => ({
	type: UPDATE_OFFICER_REQUEST,
	payload: { _id, name, email, avatarUrl, unit, callBack },
});

export const updateOfficerSuccess = (response, types) => ({
	type: UPDATE_OFFICER_SUCCESS,
	payload: { response, types },
});

export const updateOfficerFailure = (error) => ({
	type: UPDATE_OFFICER_ERROR,
	payload: { error },
});
