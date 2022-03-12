import { useState, useEffect } from "react";
import Head from "next/head";

const FractionExample = () => {
  const [x1, setX1] = useState(1);
  const [numerator, setNumerator] = useState("1");
  const [denominator, setDenominator] = useState("1");
  const [visable, setVisable] = useState(true);

  useEffect(() => {
    if (+numerator > 99) setNumerator("99");
    else if (+numerator < -99) setNumerator("-99");
    else {
      let int = Math.floor(numerator);
      let decimals = numerator.split(".")[1];
      if (decimals) {
        if (decimals.length > 2) {
          setNumerator(int + "." + decimals.slice(0, 2));
        }
      }
    }
  }, [numerator]);

  useEffect(() => {
    if (+denominator > "99") setDenominator("99");
    else if (+denominator < -99) setDenominator("-99");
    else {
      let int = Math.floor(denominator);
      let decimals = denominator.split(".")[1];
      if (decimals) {
        if (decimals.length > 2) {
          setDenominator(int + "." + decimals.slice(0, 2));
        }
      }
    }
  }, [denominator]);

  return (
    <>
      <Head>
        <title>Fractions Example</title>
      </Head>
      <style jsx>{`
        // /* Chrome, Safari, Edge, Opera */
        // input::-webkit-outer-spin-button,
        // input::-webkit-inner-spin-button {
        //   -webkit-appearance: none;
        //   margin: 0;
        // }
        // /* Firefox */
        // input[type="number"] {
        //   -moz-appearance: textfield;
        // }
      `}</style>
      <div className="h-screen w-screen flex flex-col justify-center items-center animate-fade-in">
        <div className="flex items-center text-xl md:text-4xl">
          <div className="flex flex-col items-center w-20">
            <div>{Number(x1).toFixed(2)}</div>
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <div>{Number(x1).toFixed(2)}</div>
          </div>
          <div className="mx-4 text-sm md:text-xl fa-regular fa-x" />
          <div className="flex flex-col">
            <input
              className="w-20 md:w-[7.5rem] border-2 border-gray-400 rounded-md text-right"
              type="number"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              step="0.1"
              max={99}
              min={-99}
            />
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <input
              className="w-20 md:w-[7.5rem] border-2 border-gray-400 rounded-md text-right"
              type="number"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              step="0.1"
              max={99}
              min={-99}
            />
          </div>
          <div className="mx-4 text-sm md:text-xl fa-solid fa-equals" />
          <div
            className={`w-[7.5rem] flex flex-col text-center ${
              visable ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            <div>{numerator ? (x1 * numerator).toFixed(2) : "⠀"}</div>
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <div>{denominator ? (x1 * denominator).toFixed(2) : "⠀"}</div>
          </div>
          <div className="mx-4 text-2xl md:text-4xl pb-1 md:pb-2">≈</div>
          <div
            className={`md:w-24 ${
              visable ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            {(numerator.toString().length > 0) &
            (denominator.toString().length > 0)
              ? isFinite(numerator / denominator)
                ? (numerator / denominator).toFixed(2).replace(/[.,]00$/, "")
                : "∞"
              : "⠀"}
          </div>
        </div>
        <div className="my-8 md:my-16 flex text-xl">
          <div
            className="mr-8 py-2 flex justify-center items-center w-10 border border-gray-300 bg-gray-100 shadow-md rounded cursor-pointer hover:bg-red-300 hover:border-red-400 transition-all select-none"
            onClick={() => {
              setX1(+x1 - 0.01);
            }}
          >
            <i className="fa-solid fa-minus" />
          </div>
          <input
            className="w-[33.3vw] max-w-3xl"
            type="range"
            min={0.01}
            max={10}
            step="0.01"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
          />
          <div
            className="ml-8 py-2 flex justify-center items-center w-10 border border-gray-300 bg-gray-100 shadow-md rounded cursor-pointer hover:bg-green-300 hover:border-green-400 transition-all select-none"
            onClick={() => {
              setX1(+x1 + 0.01);
            }}
          >
            <i className="fa-solid fa-plus" />
          </div>
        </div>
        <div
          className={`text-2xl flex ${
            visable ? "opacity-100" : "opacity-0"
          } transition-opacity`}
        >
          <div
            className="h-[10vh] w-[25vw] md:w-[20vw] flex justify-center items-center border border-black transition-colors"
            style={{
              backgroundColor:
                Math.abs(+numerator) >= Math.abs(+denominator) &&
                denominator.toString().length > 0
                  ? +numerator * +denominator > 0
                    ? `rgb(134, 239, 172)`
                    : `rgb(252, 165, 165)`
                  : `rgb(255, 255, 255)`,
            }}
          >
            {+numerator * +denominator > 0 ? "" : "-"}
            {(numerator.toString().length > 0) &
            (denominator.toString().length > 0)
              ? isFinite(numerator / denominator)
                ? Math.floor(Math.abs(numerator / denominator)) + "x"
                : "∞"
              : "⠀"}
          </div>
          <div className="w-8 md:w-12 flex justify-center items-center text-xl md:text-4xl">
            {+numerator * +denominator > 0 ? "+" : "-"}
          </div>
          <div className="relative h-[10vh] w-[25vw] md:w-[20vw] flex border border-black">
            <div className="absolute h-full w-full flex justify-center items-center">
              {(numerator.toString().length > 0) &
              (denominator.toString().length > 0)
                ? isFinite(numerator / denominator)
                  ? Math.abs(
                      (((Number(numerator).toFixed(4) * 1000) %
                        (Number(denominator).toFixed(4) * 1000)) /
                        (Number(denominator).toFixed(4) * 1000)) *
                        100
                    ).toFixed(2)
                  : "0"
                : "0"}
              %
            </div>
            <div
              className="transition-all ease-out duration-300"
              style={{
                width:
                  (numerator.toString().length > 0) &
                  (denominator.toString().length > 0)
                    ? isFinite(numerator / denominator)
                      ? `${Math.abs(
                          ((Number(numerator).toFixed(4) * 1000) %
                            (Number(denominator).toFixed(4) * 1000)) /
                            (Number(denominator).toFixed(4) * 10)
                        ).toFixed(2)}%`
                      : "0%"
                    : "0%",
                backgroundColor:
                  +numerator * +denominator > 0
                    ? `rgb(134, 239, 172)`
                    : `rgb(252, 165, 165)`,
              }}
            />
          </div>
        </div>
        <div
          className={`mt-8 md:mt-16 flex justify-center items-center w-32 border border-gray-300 bg-gray-100 shadow-md py-2 rounded cursor-pointer ${
            !visable
              ? "hover:bg-green-300 hover:border-green-400"
              : "hover:bg-red-300 hover:border-red-400"
          } transition-all select-none`}
          onClick={() => setVisable(!visable)}
        >
          {!visable ? "Show" : "Hide"} Answers
        </div>
      </div>
    </>
  );
};

export default FractionExample;
