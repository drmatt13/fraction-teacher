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
    data = res.data;
    // revalidate token
    data.token !== undefined
      ? Cookie.set("token", data.token, {
          // revalidate token expiration based on data[expires] property
          expires: data.expires ? undefined : 3600,
        })
      : Cookie.remove("token");
    return data;
  } catch (error) {
    return { success: false };
  }
};
