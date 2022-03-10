import Head from "next/head";

// global styles
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jaiden Math</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
