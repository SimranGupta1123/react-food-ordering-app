import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestrauntMenu from "./components/RestrauntMenu";
import UserContext from "../utils/userContext";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Cart from "./components/Cart";
import ThemeContext from "../utils/themeContext";
// import Grocery from "./components/Grocery";
// const parent = React.createElement("div", { id: "parent" }, [
//   React.createElement("div", { id: "child1" }, [
//     React.createElement("h1", {}, "I am an h1 tag"),
//     React.createElement("h2", {}, "I am an h2 tag"),
//   ]),
//   React.createElement("div", { id: "child2" }, [
//     React.createElement("h1", {}, "I am an h1 tag"),
//     React.createElement("h2", {}, "I am an h2 tag"),
//   ]),
// ]);
// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello world from react"
// );

// console.log(heading); // js object

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(parent); // this would convert object to html tag

// const heading = React.createElement("h1", {}, "Namaste React");
// JSX is not html in js, JSX is HTML like syntax
// const jsxHeading = <h1 id="heading">Namaste react</h1>;

// root.render(jsxHeading);

// React Component
// Class based components
// Functional Components

// Lazy Loading
// On Demand Loading
const Grocery = lazy(() => import("./components/Grocery"));

const AppLayoutComponent = () => {
  // Authentication
  const [userName, setUserName] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? "dark" : "light";

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const data = {
      name: "Simran Gupta",
    };
    setUserName(data.name);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);
  return (
    <Provider store={appStore}>
      <ThemeContext.Provider value={{ theme, toggleMode }}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <div className="app">
            <Header />
            <Outlet />
          </div>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayoutComponent />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestrauntMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

root.render(
  <RouterProvider router={appRouter}>
    <AppLayoutComponent />
  </RouterProvider>
);
