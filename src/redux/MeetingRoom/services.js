import axios from 'axios';
import { baseUrl } from '../../constants/defaultValues';
import { getToken } from '../../helpers/Utils';

export const addSymptomsService = async (
	roomId,
	room,
	category,
	description,
) => {
	const token = getToken();
	try {
		const response = await axios.post(
			`${baseUrl}/room`,
			{ roomId, room, category, description },
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

export const updateSymptomsService = async (
	id,
	roomId,
	room,
	category,
	description,
) => {
	const token = getToken();
	try {
		const response = await axios.put(
			`${baseUrl}/room/${id}`,
			{ roomId, room, category, description },
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
