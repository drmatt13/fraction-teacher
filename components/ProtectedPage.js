import { useContext, useLayoutEffect } from "react";

// context
import _appContext from "../context/_appContext";

const ProtectedPage = ({ children }) => {
  const { logout, router, user_id } = useContext(_appContext);

  useLayoutEffect(() => {
    if (!user_id) logout(router.route);
  }, [user_id, router.route, logout]);

  return <>{children}</>;
};

export default ProtectedPage;
