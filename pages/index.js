import { useState, useEffect } from "react";

// styles
import styles from "../styles/Home.module.scss";

const Home = () => {
  const [x1, setX1] = useState(1);
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(1);

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
        <div className="pl-12 flex items-center text-4xl">
          <div className="flex flex-col /items-center w-[6.5rem]">
            <div>{Number(x1).toFixed(2)}</div>
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <div>{Number(x1).toFixed(2)}</div>
          </div>
          <div className="mx-4">x</div>
          <div className="flex flex-col /items-center w-[6.5rem]">
            <input
              className="w-full border-2 border-gray-400 rounded-md text-center"
              type="number"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              max={99}
              min={-99}
            />
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <input
              className="w-full border-2 border-gray-400 rounded-md text-center"
              type="number"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              max={99}
              min={-99}
            />
          </div>
          <div className="mx-4">=</div>
          <div className="flex flex-col /items-center w-[6.5rem]">
            <div>{numerator ? (x1 * numerator).toFixed(2) : "⠀"}</div>
            <div className="border-b border-[1px] border-black my-2 w-full" />
            <div>{denominator ? (x1 * denominator).toFixed(2) : "⠀"}</div>
          </div>
          <div className="mx-4">=</div>
          <div className="min-w-[80px]">
            {(numerator.toString().length > 0) &
            (denominator.toString().length > 0)
              ? isFinite(numerator / denominator)
                ? (numerator / denominator).toFixed(2).replace(/[.,]00$/, "")
                : "∞"
              : "⠀"}
          </div>
        </div>
        <div className="my-16">
          <input
            className="w-[75vw]"
            type="range"
            min={0.01}
            max={10}
            step="0.01"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
          />
        </div>
        <div className="flex">
          <div
            className="h-[10vh] w-[10vh] text-2xl flex justify-center items-center border border-black transition-colors"
            style={{
              backgroundColor:
                numerator / denominator !== 0 &&
                denominator.toString().length > 0
                  ? `rgb(134, 239, 172)`
                  : `rgb(255, 255, 255)`,
            }}
          >
            {(numerator.toString().length > 0) &
            (denominator.toString().length > 0)
              ? isFinite(numerator / denominator)
                ? Math.floor(numerator / denominator)
                : "∞"
              : "⠀"}
          </div>
          <div className="mx-4 flex justify-center items-center text-4xl">
            +
          </div>
          <div className="h-[10vh] w-[25vw] flex border border-black">
            <div
              className="bg-green-300"
              style={{
                flex: `${
                  (numerator.toString().length > 0) &
                  (denominator.toString().length > 0)
                    ? isFinite(numerator / denominator)
                      ? (numerator % denominator) / denominator
                      : "0"
                    : "0"
                }`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
