import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Cookie from "js-cookie";
import { SessionProvider, signOut } from "next-auth/react";

// components
import AppLayout from "../components/AppLayout";

// custom hooks
import useCredentials from "../hooks/useCredentials";

// global context
import _appContext from "../context/_appContext";

// global styles
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const { loading, user_id, setUser_id } = useCredentials();

  // tailwind darkmode initial state
  const [darkMode, setDarkMode] = useState(false);

  const [mobile] = useState(
    typeof window !== "undefined"
      ? /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      : null
  );

  const logout = async (href) => {
    Cookie.remove("token");
    setUser_id(null);
    signOut({ redirect: false });
    await router.push(
      `/login${
        typeof href === "string"
          ? href === "/"
            ? ""
            : `?redirect=${href}`
          : ""
      }`
    );
  };

  const toggleDarkMode = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(true);
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Next.js | Tailwind | Auth</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,user-scalable=no"
        />
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* Android status bar color */}
        <meta name="theme-color" content={darkMode ? "#7d54ed" : "#f33984"} />
        {/* Apple status bar color */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={darkMode ? "black" : "white"}
        />
        {/* Enable Apple fullscreen */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* Open Graph */}
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <_appContext.Provider
          value={{
            darkMode,
            toggleDarkMode,
            loading,
            logout,
            mobile,
            router,
            user_id,
            setUser_id,
          }}
        >
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </_appContext.Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
