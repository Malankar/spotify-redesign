import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console) => ({
  ...console,
  warn: (...args) =>
    args[0].includes("Duplicate atom key") ? null : console.warn(...args),
}));

global.console = mutedConsole(global.console);
