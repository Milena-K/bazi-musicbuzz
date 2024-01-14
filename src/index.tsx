import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Register from './register';
import Login from './Login';
import LoginUser from './LoginUser';
import Header from './Header';
import Profile from './Profile';

/*
import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
 */

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        // when the URL matches this segment
        path: "/login/artist",
        // it renders this element
        element: <LoginUser />,
    },
    {
        // when the URL matches this segment
        path: "/login/listener",
        // it renders this element
        element: <LoginUser />,
    },
    {
        // when the URL matches this segment
        path: "/profile",
        // it renders this element
        element: <Profile />,
    },
    {
        // when the URL matches this segment
        path: "/login",
        // it renders this element
        element: <Login />,
    },
    {
        // when the URL matches this segment
        path: "/register",
        // it renders this element
        element: <Register />,
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
