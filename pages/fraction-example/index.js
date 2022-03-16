import { useState, useEffect } from "react";
import Head from "next/head";

// components
import RepeaterButton from "../../components/RepeaterButton";
import MobileButton from "../../components/MobileButton";

const FractionExample = () => {
  const [x1, setX1] = useState(1);
  const [numerator, setNumerator] = useState("1");
  const [denominator, setDenominator] = useState("1");
  const [visable, setVisable] = useState(true);

  useEffect(() => {
    if (x1 <= 0) setX1(0.01);
    if (x1 > 10) setX1(10.0);
  }, [x1]);

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
          <div className="flex flex-col items-center w-12 md:w-20">
            <div>{Number(x1).toFixed(2)}</div>
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <div>{Number(x1).toFixed(2)}</div>
          </div>
          <div className="mx-4 text-sm md:text-xl fa-regular fa-x" />
          <div className="flex flex-col">
            <input
              className="w-[4.5rem] md:w-[7.5rem] border-2 shadow-sm rounded-md text-right"
              type="number"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              step="0.1"
              max={99}
              min={-99}
            />
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <input
              className="w-[4.5rem] md:w-[7.5rem] border-2 shadow-sm rounded-md text-right"
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
            className={`w-16 md:w-[7.5rem] flex flex-col text-center ${
              visable ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            <div>{numerator ? (x1 * numerator).toFixed(2) : "⠀"}</div>
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <div>{denominator ? (x1 * denominator).toFixed(2) : "⠀"}</div>
          </div>
          <div className="mx-4 text-2xl md:text-4xl pb-1 md:pb-2">≈</div>
          <div
            className={`flex flex-col ${
              visable ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            <div className="w-16 md:w-28 pb-1 border-2 rounded-md text-center">
              {+numerator * +denominator > 0
                ? ""
                : numerator.length === 0
                ? ""
                : "-"}
              {(numerator.toString().length > 0) &
              (denominator.toString().length > 0)
                ? isFinite(numerator / denominator)
                  ? Math.abs(
                      (numerator / denominator)
                        .toFixed(2)
                        .replace(/[.,]00$/, "")
                    )
                  : "∞"
                : "⠀"}
            </div>
          </div>
        </div>
        <div className="my-8 md:my-16 flex text-xl">
          <div className="mr-8">
            <RepeaterButton
              className="py-2 flex justify-center items-center w-10 border border-gray-300 bg-gray-100 shadow-md rounded cursor-pointer focus:bg-red-300 focus:border-red-400 hover:bg-red-300 hover:border-red-400 transition-colors"
              onHold={() => setX1((x1) => +x1 - 0.01)}
            >
              <i className="fa-solid fa-minus" />
            </RepeaterButton>
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
          <div className="ml-8">
            <RepeaterButton
              className="py-2 flex justify-center items-center w-10 border border-gray-300 bg-gray-100 shadow-md rounded cursor-pointer focus:bg-green-300 focus:border-green-400 hover:bg-green-300 hover:border-green-400 transition-colors"
              onHold={() => setX1((x1) => +x1 + 0.01)}
            >
              <i className="fa-solid fa-plus" />
            </RepeaterButton>
          </div>
        </div>
        <div
          className={`md:text-2xl flex ${
            visable ? "opacity-100" : "opacity-0"
          } transition-opacity`}
        >
          <div
            className="h-12 md:h-20 w-[25vw] md:w-[20vw] rounded-md md:rounded-2xl flex justify-center items-center shadow-lg border border-gray-500/10 transition-colors"
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
            {+numerator * +denominator > 0
              ? ""
              : numerator.length === 0
              ? ""
              : "-"}
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
          <div className="relative h-12 md:h-20 w-[25vw] md:w-[20vw] rounded-md md:rounded-2xl flex shadow-lg border border-gray-500/10 overflow-hidden">
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
        <MobileButton
          className={`mt-8 md:mt-16 flex justify-center items-center w-32 border border-gray-300 bg-gray-100 shadow-md py-2 rounded cursor-pointer ${
            !visable
              ? "focus:bg-green-300 focus:border-green-400 hover:bg-green-300 hover:border-green-400"
              : "focus:bg-red-300 focus:border-red-400 hover:bg-red-300 hover:border-red-400"
          } transition-colors`}
          onClick={() => setVisable(!visable)}
        >
          {!visable ? (
            <span className="animate-fade-in-slow">Show</span>
          ) : (
            <span className="animate-fade-in-slow">Hide</span>
          )}{" "}
          Answers
        </MobileButton>
      </div>
    </>
  );
};

export default FractionExample;
