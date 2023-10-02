import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import HomePage from './app/features/home/Home.js';
import AboutPage from './app/features/about/AboutPage.js';
import MenPage from './app/features/salons/Men.js';
import WomenPage from './app/features/salons/Women.js';
import LoginPage from './app/features/account/Login.js';
import Root from './app/layout/root.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'aboutUs',
        element: <AboutPage />,
      },
      {
        path: 'men',
        element: <MenPage />,
      },
      {
        path: 'women',
        element: <WomenPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);
function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
