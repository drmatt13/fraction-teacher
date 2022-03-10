import { useState, useEffect } from "react";
import Head from "next/head";

const FractionExample = () => {
  const [x1, setX1] = useState(1);
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(1);
  const [visable, setVisable] = useState(true);

  useEffect(() => {
    if (numerator > 99) setNumerator(99);
    if (numerator < -99) setNumerator(-99);
  }, [numerator]);

  useEffect(() => {
    if (denominator > 99) setDenominator(99);
    if (denominator < -99) setDenominator(-99);
  }, [denominator]);

  return (
    <>
      <Head>
        <title>Fractions Example</title>
      </Head>
      <style jsx>{`
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className="h-screen w-screen flex flex-col justify-center items-center animate-fade-in">
        <div className="pl-8 md:pl-12 flex items-center text-xl md:text-4xl">
          <div className="flex flex-col /items-center /md:w-[6.5rem]">
            <div>{Number(x1).toFixed(2)}</div>
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <div>{Number(x1).toFixed(2)}</div>
          </div>
          <div className="mx-4">x</div>
          <div className="flex flex-col">
            <input
              className="w-24 border-2 border-gray-400 rounded-md text-center"
              type="number"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              max={99}
              min={-99}
            />
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <input
              className="w-24 border-2 border-gray-400 rounded-md text-center"
              type="number"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              max={99}
              min={-99}
            />
          </div>
          <div className="mx-4">=</div>
          <div
            className={`flex flex-col ${
              visable ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            <div>{numerator ? (x1 * numerator).toFixed(2) : "⠀"}</div>
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <div>{denominator ? (x1 * denominator).toFixed(2) : "⠀"}</div>
          </div>
          <div className="mx-4">=</div>
          <div
            className={`min-w-[60px] md:min-w-[80px] ${
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
        <div className="my-8 md:my-16">
          <input
            className="w-[75vw] max-w-3xl"
            type="range"
            min={0.01}
            max={10}
            step="0.01"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
          />
        </div>
        <div
          className={`flex ${
            visable ? "opacity-100" : "opacity-0"
          } transition-opacity`}
        >
          <div
            className="h-[10vh] w-[25vw] md:w-[20vw] text-2xl flex justify-center items-center border border-black transition-colors"
            style={{
              backgroundColor:
                numerator / denominator !== 0 &&
                numerator >= denominator &&
                denominator.toString().length > 0
                  ? `rgb(134, 239, 172)`
                  : `rgb(255, 255, 255)`,
            }}
          >
            {(numerator.toString().length > 0) &
            (denominator.toString().length > 0)
              ? isFinite(numerator / denominator)
                ? Math.floor(numerator / denominator) + "x"
                : "∞"
              : "⠀"}
          </div>
          <div className="mx-4 flex justify-center items-center text-xl md:text-4xl">
            +
          </div>
          <div className="h-[10vh] w-[25vw] md:w-[20vw] flex border border-black">
            <div
              className="bg-green-300"
              style={{
                flex: `${
                  (numerator.toString().length > 0) &
                  (denominator.toString().length > 0)
                    ? isFinite(numerator / denominator)
                      ? ((Number(numerator).toFixed(4) * 1000) %
                          (Number(denominator).toFixed(4) * 1000)) /
                        (Number(denominator).toFixed(4) * 1000)
                      : "0"
                    : "0"
                }`,
              }}
            />
          </div>
        </div>
        <div
          className="mt-8 md:mt-16 flex justify-center items-center w-32 border border-gray-300 bg-gray-100 shadow-md py-2 rounded cursor-pointer hover:bg-green-300 hover:border-green-400 transition-all select-none"
          onClick={() => setVisable(!visable)}
        >
          {visable ? "Show" : "Hide"} Answers
        </div>
      </div>
    </>
  );
};

export default FractionExample;
