import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import User from '../pages/user';
import Albums from '../pages/albums';
import Artists from '../pages/artists';
import Tracks from '../pages/tracks';
import PlayLists from '../pages/play-lists';
import Login from '../pages/login';

const PlayerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/play-lists" element={<PlayLists />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default PlayerRoutes;
