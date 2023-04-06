import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Search from '../pages/search';
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
import Page404 from '../pages/404';

import { IStore } from '../store';

const AuthRequire = ({ children }) => {
  const location = useLocation();
  const user = useSelector((store: IStore) => store.user.data);

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
      <Route path="/" element={<AuthRequire><Search /></AuthRequire>} />
      <Route path="/search" element={<AuthRequire><Search /></AuthRequire>} />
      <Route path="/search/artist/:id" element={<AuthRequire><Artist backButtonText="Back to Search page" /></AuthRequire>} />
      <Route path="/search/artist/:artistId/:albumId" element={<AuthRequire><ArtistAlbum /></AuthRequire>} />
      <Route path="/search/album/:albumId" element={<AuthRequire><Album /></AuthRequire>} />
      <Route path="/search/playlist/:id" element={<AuthRequire><PlayList backButtonText="Back to Search page" /></AuthRequire>} />
      <Route path="/user" element={<AuthRequire><User /></AuthRequire>} />
      <Route path="/user/artist/:id" element={<AuthRequire><Artist backButtonText="Back to User page" /></AuthRequire>} />
      <Route path="/user/artist/:artistId/:albumId" element={<AuthRequire><ArtistAlbum /></AuthRequire>} />
      <Route path="/artists" element={<AuthRequire><Artists /></AuthRequire>} />
      <Route path="/artists/:id" element={<AuthRequire><Artist backButtonText="Back to Artists" /></AuthRequire>} />
      <Route path="/artists/:artistId/:albumId" element={<AuthRequire><ArtistAlbum /></AuthRequire>} />
      <Route path="/albums" element={<AuthRequire><Albums /></AuthRequire>} />
      <Route path="/albums/:albumId" element={<AuthRequire><Album /></AuthRequire>} />
      <Route path="/playlists" element={<AuthRequire><PlayLists /></AuthRequire>} />
      <Route path="/playlists/:id" element={<AuthRequire><PlayList backButtonText="Back to Playlists" /></AuthRequire>} />
      <Route path="/tracks" element={<AuthRequire><Tracks /></AuthRequire>} />
      <Route path="/login" element={<Login />} />
      <Route path="/spotify-auth" element={<SpotifyAuth />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
}

export default PlayerRoutes;
