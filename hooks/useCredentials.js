import { useState, useEffect } from "react";
import Cookie from "js-cookie";

// utils
import useService from "../utils/useService";

const useCredentials = () => {
  const [user_id, setUser_id] = useState();
  const [loading, setLoading] = useState(true);

  const checkCredentials = async () => {
    // check if no token cookie exists
    if (!Cookie.get("token")) return setLoading(false);
    // check if token cookie is valid and update user_id
    try {
      const data = await useService("get user");
      if (data.token) setUser_id(data.user.user_id);
    } catch (error) {
      Cookie.remove("token");
    }
    setLoading(false);
  };

  useEffect(checkCredentials, []);

  return { loading, user_id, setUser_id };
};

export default useCredentials;
