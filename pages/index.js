import { useContext } from "react";

// components
import ProtectedPage from "../components/ProtectedPage";

// context
import _appContext from "../context/_appContext";

// styles
import styles from "../styles/Home.module.scss";

const Home = () => {
  const { logout } = useContext(_appContext);

  return (
    <ProtectedPage>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="animate-fade-in">
          <div
            className="select-none bg-gray-300 rounded py-2 px-10 inline-block border shadow cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors"
            onClick={logout}
          >
            logout
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default Home;
