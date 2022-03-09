import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Cookie from "js-cookie";

// components
import Loading from "../components/Loading";

// context
import _appContext from "../context/_appContext";

// utils
import service from "../utils/service";

// styles
// ..

const Register = () => {
  const { router, user_id, setUser_id } = useContext(_appContext);

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if uder_id exists or is updated, redirect to home
  useEffect(() => {
    if (user_id) {
      router.push("/");
    }
  }, [user_id]);

  const register = async () => {
    setLoading(true);

    const data = await service("register", {
      firstName,
      lastName,
      email,
      password,
    });
    if (data.user && data.token) {
      Cookie.set("token", data.token);
      setUser_id(data.user.user_id);
    } else {
      alert("registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center w-60 p-4 bg-gray-100/75 rounded-lg animate-fade-in">
          <div className="flex flex-col mt-2 w-52">
            <input
              className="border border-gray-400 mb-2 p-2 rounded"
              type="text"
              placeholder="first name"
            />
            <input
              className="border border-gray-400 mb-2 p-2 rounded"
              type="text"
              placeholder="last name"
            />
            <input
              className="border border-gray-400 mb-2 p-2 rounded"
              type="text"
              placeholder="email"
            />
            <input
              className="border border-gray-400 mb-2 p-2 rounded"
              type="text"
              placeholder="password"
            />
            <input
              className="border border-gray-400 mb-2 p-2 rounded"
              type="text"
              placeholder="confirm password"
            />
          </div>
          <div
            className="select-none mb-2 py-2 px-10 w-full flex justify-center items-center rounded border border-sky-500/75 shadow cursor-pointer bg-sky-500 hover:bg-sky-400 text-gray-200 hover:text-white transition-colors"
            onClick={register}
          >
            Register
          </div>
          <Link href="/login">
            <a className="text-blue-500 hover:underline hover:text-purple-500">
              Return to login
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
