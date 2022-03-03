import { useContext } from "react";

// components
import Loading from "../components/Loading";

// context
import _appContext from "../context/_appContext";

const Layout = ({ children }) => {
  const { loading } = useContext(_appContext);

  return (
    <div className="h-screen w-screen bg-black">
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          {/* <div>NAVBAR</div> */}
          <>{children}</>
        </>
      )}
    </div>
  );
};

export default Layout;
