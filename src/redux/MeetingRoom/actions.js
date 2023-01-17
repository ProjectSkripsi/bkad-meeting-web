import {
	ADD_SYMPTOMS_REQUEST,
	ADD_SYMPTOMS_SUCCESS,
	ADD_SYMPTOMS_ERROR,
	UPDATE_SYMPTOMS_REQUEST,
	UPDATE_SYMPTOMS_SUCCESS,
	UPDATE_SYMPTOMS_ERROR,
} from '../actions';

export const addSymptomsRequest = (
	roomId,
	room,
	category,
	description,
	callBack,
) => ({
	type: ADD_SYMPTOMS_REQUEST,
	payload: { roomId, room, category, description, callBack },
});

export const addSymptomsSuccess = (response, types) => ({
	type: ADD_SYMPTOMS_SUCCESS,
	payload: { response, types },
});

export const addSymptomsFailure = (error) => ({
	type: ADD_SYMPTOMS_ERROR,
	payload: { error },
});

export const updateSymptomsRequest = (
	id,
	roomId,
	room,
	category,
	description,
	callBack,
) => ({
	type: UPDATE_SYMPTOMS_REQUEST,
	payload: { id, roomId, room, category, description, callBack },
});

export const updateSymptomsSuccess = (response, types) => ({
	type: UPDATE_SYMPTOMS_SUCCESS,
	payload: { response, types },
});

export const updateSymptomsFailure = (error) => ({
	type: UPDATE_SYMPTOMS_ERROR,
	payload: { error },
});
