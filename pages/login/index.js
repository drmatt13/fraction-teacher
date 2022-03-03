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

const Login = () => {
  const { router, user_id, setUser_id } = useContext(_appContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expires, setExpires] = useState(true);

  // check if a token is stored in a cookie
  useEffect(() => {
    if (user_id) {
      // protected route will check auth
      router.push("/");
    }
  }, [user_id]);

  const login = async () => {
    setLoading(true);

    const data = await service("login", {
      email,
      password,
      expires,
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
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border border-gray-400 mb-2 p-2 rounded"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full mb-2 flex items-center justify-center">
            <input
              className="mr-2"
              type="checkbox"
              name="expires"
              checked={!expires}
              onChange={(e) => setExpires(!e.target.checked)}
            />
            <label htmlFor="expires">Stay logged in?</label>
          </div>
          <div
            className="select-none mb-2 py-2 px-10 w-full flex justify-center items-center rounded border shadow cursor-pointer bg-sky-500 hover:bg-sky-400 text-gray-200 hover:text-white transition-colors"
            onClick={login}
          >
            login
          </div>
          <Link href="/register">
            <a className="text-blue-400 hover:underline hover:text-purple-500">
              Sign Up Today
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
