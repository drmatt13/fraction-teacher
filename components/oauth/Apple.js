import { useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// context
import _appContext from "../../context/_appContext";

const Github = ({ session }) => {
  const { logout } = useContext(_appContext);

  return (
    <div className="text-white">
      Signed in as {session.user.email} <br />
      <button onClick={logout}>Sign out</button>
    </div>
  );
};

export default Github;
