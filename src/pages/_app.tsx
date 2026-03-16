import { appWithTranslation } from "next-i18next";
import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import { store } from "@/redux/app/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import CustomHead from "@/components/layout/CustomHead";
import { SmoothCursor } from "@/components/animation/SmoothCursor";

function App({ Component, pageProps, router }: AppProps) {
  // Define pages you want to exclude
  const excludeHeadRoutes = ["/404", "/500", "/_error"];
  const isExcluded = excludeHeadRoutes.includes(router.pathname);

  return (
    <>
      {!isExcluded && (
        <CustomHead
          jsonLd={pageProps.jsonLd}
          metaDataTag={pageProps.metaDataTag}
        />
      )}

      <Provider store={store}>
        <ThemeProvider defaultTheme="light">
          <AuthContextProvider>
            <Component key={router.route} {...pageProps} />
            
            {/* <SmoothCursor/> */}
            <Toaster />
          </AuthContextProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(App);
