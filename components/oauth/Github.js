import { useState, useEffect, useContext } from "react";
import Cookie from "js-cookie";

// components
import Loading from "../Loading";
import Redirect from "../Redirect";

// context
import _appContext from "../../context/_appContext";

// utils
import service from "../../utils/service";

const Github = ({ session }) => {
  const { logout, router, user_id, setUser_id } = useContext(_appContext);

  const [loading, setLoading] = useState(true);

  // if uder_id exists or is updated, redirect to home
  useEffect(() => {
    if (user_id) {
      router.push("/");
    }
  }, [user_id]);

  const login = async () => {
    setLoading(true);
    const data = await service("login", {
      email: "",
      password: "",
    });
    if (data.user && data.token) {
      Cookie.set("token", data.token);
      setUser_id(data.user.user_id);
    } else {
      alert("login failed");
      logout();
    }
  };

  useEffect(() => {
    login();
  }, []);

  return <>{loading ? <Loading /> : <Redirect to="/login" />}</>;

  // return (
  //   <div className="text-white">
  //     Signed in as {session.user.email} <br />
  //     <button onClick={logout}>Sign out</button>
  //   </div>
  // );
};

export default Github;
