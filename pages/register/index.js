import { useState, useContext, useEffect } from "react";
import Link from "next/link";

// components
import Loading from "../../components/Loading";

// context
import _appContext from "../../context/_appContext";

// utils
import service from "../../utils/service";

// styles
// ..

const Register = () => {
  const { router, user_id, setUser_id } = useContext(_appContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // check if a token is stored in a cookie
  useEffect(() => {
    if (user_id) {
      // protected route will check auth
      router.push("/");
    }
  }, [user_id]);

  const register = async () => {
    setLoading(true);

    const data = await service("login", {
      email,
      password,
    });
    if (data.user) {
      setUser_id(data.user.user_id);
    } else {
      alert("login failed");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg animate-fade-in">
          <div className="flex flex-col mt-2">
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
            className="select-none mb-2 py-2 px-10 w-full flex justify-center items-center rounded border shadow cursor-pointer bg-sky-500 hover:bg-sky-400 text-gray-200 hover:text-white transition-colors"
            onClick={register}
          >
            Register
          </div>
          <Link href="/login">
            <a className="text-blue-400 hover:underline hover:text-purple-500">
              Return to login
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
