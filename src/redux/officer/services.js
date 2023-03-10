import axios from 'axios';
import { baseUrl } from '../../constants/defaultValues';
import { getToken } from '../../helpers/Utils';

export const deleteOfficerService = async (_id) => {
	const token = getToken();
	try {
		const response = await axios.delete(`${baseUrl}/participant/${_id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		const err = error.response ? error.response : error;
		return Promise.reject(err);
	}
};

export const addOfficerService = async (
	name,
	email,
	password,
	avatarUrl,
	unit,
) => {
	const token = getToken();
	try {
		const response = await axios.post(
			`${baseUrl}/participant/register`,
			{ name, email, password, avatarUrl, unit },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response;
	} catch (error) {
		const err = error.response ? error.response : error;
		return Promise.reject(err);
	}
};

export const updateOfficerService = async (
	_id,
	name,
	email,
	avatarUrl,
	unit,
) => {
	const token = getToken();

	try {
		const response = await axios.put(
			`${baseUrl}/participant/${_id}`,
			{ name, email, avatarUrl, unit },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		const err = error.response ? error.response : error;
		return Promise.reject(err);
	}
};
