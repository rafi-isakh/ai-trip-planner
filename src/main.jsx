import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from "react-router";
import CreateTrip from "@/create-trip/index.jsx";
import Header from "@/components/custom/Header.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/create-trip',
        element: <CreateTrip />,
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
  </StrictMode>,
)
