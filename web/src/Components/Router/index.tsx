import * as React from 'react';
// TODO Remover o ts-ignore assim que descobrirmos como arrumar
// @ts-ignore
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../Pages/Home';
import { ProfilePage } from '../../Pages/Profile';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>
);
