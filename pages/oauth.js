import { useContext, useState } from "react";
import { useSession } from "next-auth/react";

// components
import Github from "../components/oauth/Github";
import Loading from "../components/Loading";
import Redirect from "../components/Redirect";

// context
import _appContext from "../context/_appContext";

const Oauth = () => {
  const { router } = useContext(_appContext);

  const [query] = useState(router.asPath.split("?")[1]);

  const { data: session } = useSession();

  if (typeof session === "undefined") return <Loading />;
  else if (session === null) return <Redirect route="/" />;

  if (query === "github") return <Github session={session} />;
  else if (query === "google") return <Github session={session} />;
  else if (query === "facebook") return <Github session={session} />;
  else if (query === "apple") return <Github session={session} />;
  else return <Redirect to="/login" />;
};

export default Oauth;
