import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Search from './Search';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Register from './register';
import Login from './Login';
import LoginUser from './LoginUser';
import Header from './Header';
import UploadSong from './UploadSong';
import UploadEpisode from './UploadEpisode';
import Profile from './Profile';
import CreatePodcast from './createPodcast';
import CreateAlbum from './CreateAlbum';
import Playlists from './Playlists';
import SearchContextProvider from './SearchContext';
import { AuthContext, AuthProvider } from './AuthContext';

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
        path: "/login",
        element: <LoginUser />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    // protected with auth
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/playlist/:playlistName",
        element: <Playlists />,
    },
    {
        path: "/search",
        element: (<SearchContextProvider><Search /></SearchContextProvider>),
    },
    {
        path: "/create/album",
        element: <CreateAlbum />,
    },
    {
        path: "/create/podcast",
        element: <CreatePodcast />,
    },
    {
        path: "/upload/episode",
        element: <UploadEpisode />,
    },
    {
        path: "/upload/song",
        element: <UploadSong />,
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
