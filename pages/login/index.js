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
  const { router, user_id } = useContext(_appContext);

  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState(1);

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 1 ? 2 : 1);
  };

  // check if a token is stored in a cookie
  useEffect(() => {
    if (user_id) {
      router.push("/");
    }
  }, [user_id]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center w-60 px-4 pt-4 pb-2 bg-white rounded-lg animate-fade-in">
          {loginMethod === 1 && <StandardLogin setLoading={setLoading} />}
          {loginMethod === 2 && <AltLogin setLoading={setLoading} />}
          <div
            className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border shadow cursor-pointer bg-black hover:bg-gray-700 text-gray-200 hover:text-white transition-colors"
            onClick={toggleLoginMethod}
          >
            {loginMethod === 1 ? "alternate login" : "back"}
          </div>
          <Link href="/register">
            <a className="mb-2 text-blue-400 hover:underline hover:text-purple-500">
              Sign Up Today
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;

const StandardLogin = ({ setLoading }) => {
  const { setUser_id } = useContext(_appContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expires, setExpires] = useState(true);

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
    <div className="flex flex-col items-center animate-fade-in">
      <div className="flex flex-col w-52 mt-2">
        <input
          className="border border-gray-400 mb-2 p-2 rounded"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-400 mb-3 p-2 rounded"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full mb-3 flex items-center justify-center">
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
        className="select-none mb-1 py-2 w-full flex justify-center items-center rounded border shadow cursor-pointer bg-sky-500 hover:bg-sky-400 text-gray-200 hover:text-white transition-colors"
        onClick={login}
      >
        login
      </div>
    </div>
  );
};

const AltLogin = ({ setLoading }) => {
  const [expires, setExpires] = useState(true);
  return (
    <div className="w-full animate-fade-in">
      <div className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border shadow cursor-pointer bg-green-500 hover:bg-green-400 text-gray-900 hover:text-black transition-colors">
        <img
          className="h-4 mr-2"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
        />
        google login
      </div>
      <div className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border shadow cursor-pointer bg-red-500/90 hover:bg-red-400 text-gray-200 hover:text-white transition-colors">
        <i className="devicon-apple-original mr-2" />
        apple login
      </div>
      <div className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border shadow cursor-pointer bg-neutral-600 hover:bg-neutral-500 text-gray-200 hover:text-white transition-colors">
        <i className="devicon-github-original mr-2 text-black" />
        github login
      </div>
      <div className="select-none mb-2 py-2 w-full flex justify-center items-center rounded border shadow cursor-pointer bg-blue-600 hover:bg-blue-500 text-gray-200 hover:text-white transition-colors">
        <i className="devicon-facebook-plain mr-2" />
        facebook login
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
    </div>
  );
};
