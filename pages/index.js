import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>Math Examples</title>
      </Head>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col">
          <Link href="/fraction-example">
            <a className="underline text-purple-600 hover:text-blue-500">
              Fractions Example
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
