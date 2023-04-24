import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import AuthView from "./views/AuthView";
import IncomeView from "./views/IncomeView";
// import * as serviceWorker from './serviceWorker';
import ExpenseView from './views/ExpenseView';
import HomeDashboard from "./views/HomeDashboard";
import BudgetView from "./views/BudgetView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthView />,
  },
  {
    path: "/home",
    element: <HomeDashboard />,
  },
  {
    path: "/income",
    element: <IncomeView />,
  },
  {
    path: "/expense",
    element: <ExpenseView />,
  },
  {
    path: "/budget",
    element: <BudgetView/>,
  }
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
