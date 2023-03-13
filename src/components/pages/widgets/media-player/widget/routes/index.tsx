import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from '../pages/home';
import User from '../pages/user';
import Albums from '../pages/albums';
import Album from '../pages/albums/album';
import Artists from '../pages/artists';
import Artist from '../pages/artists/artist';
import ArtistAlbum from '../pages/artists/artist/album';
import Tracks from '../pages/tracks';
import PlayLists from '../pages/play-lists';
import PlayList from '../pages/play-lists/play-list';
import Login from '../pages/login';
import SpotifyAuth from '../pages/spotify-auth'

import { useUserData } from '../store/user';

const AuthRequire = ({ children }) => {
  const location = useLocation();
  const { user } = useUserData();

  if (user) {
    return children;
  }
  const paths = location.pathname.split('/');
  const pmIndex = paths.indexOf('media-player');
  const loginPath = paths.filter((item,  index) => index <= pmIndex);

  loginPath.push('login');

  return <Navigate to={loginPath.join('/')} replace={true} />;
};

const PlayerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthRequire><Home /></AuthRequire>} />
      <Route path="/home" element={<AuthRequire><Home /></AuthRequire>} />
      <Route path="/user" element={<AuthRequire><User /></AuthRequire>} />
      <Route path="/artists" element={<AuthRequire><Artists /></AuthRequire>} />
      <Route path="/artists/:id" element={<AuthRequire><Artist /></AuthRequire>} />
      <Route path="/artists/:artistId/:albumId" element={<AuthRequire><ArtistAlbum /></AuthRequire>} />
      <Route path="/albums" element={<AuthRequire><Albums /></AuthRequire>} />
      <Route path="/albums/:albumId" element={<AuthRequire><Album /></AuthRequire>} />
      <Route path="/play-lists" element={<AuthRequire><PlayLists /></AuthRequire>} />
      <Route path="/play-lists/:id" element={<AuthRequire><PlayList /></AuthRequire>} />
      <Route path="/tracks" element={<AuthRequire><Tracks /></AuthRequire>} />
      <Route path="/login" element={<Login />} />
      <Route path="/spotify-auth" element={<SpotifyAuth />} />
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default PlayerRoutes;
