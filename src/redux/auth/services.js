import axios from "axios";
import { baseUrl } from "../../constants/defaultValues";
import { getToken } from "../../helpers/Utils";
const token = getToken();

export const userLoginService = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, userData);
    return response;
  } catch ({ response }) {
    return response;
  }
};

export const resetPasswordService = async (userData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/reset-password`,
      userData
    );
    return response;
  } catch ({ response }) {
    return response;
  }
};

export const updateProfileService = async (data) => {
  try {
    const response = await axios.put(`${baseUrl}/user/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch ({ response }) {
    return response;
  }
};
