import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App'
import Homes from './pages/Homes'
import Repodetails from './pages/Repodetails'
import ErrorPage from './pages/ErrorPage'
import AppOutlet from './pages/AppOutlet'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Homes />} errorElement={<ErrorPage />} />
      <Route path='/repodetails' element={<AppOutlet/>}>
          <Route path=':id' element={<Repodetails/>}/>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
