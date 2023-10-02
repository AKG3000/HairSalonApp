import React from 'react';
import Header from './header';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}