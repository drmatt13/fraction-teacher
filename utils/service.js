import axios from "axios";
import Cookie from "js-cookie";

export default async (service, data = {}) => {
  try {
    // send the service + data request to the eventbus
    const res = await axios.post(
      `api/eventbus`,
      {
        service,
        data,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return { success: false };
  }
};
