
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Write from './pages/Write';
import Single from './pages/Single';
import Home from './pages/Home';
import './style.scss';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
      path:"/",
      element:<Home/>
    },
    {
      path:"/post/:id",
      element:<Single/>
    },
    {
      path:"/Write",
      element:<Write/>
    },
  ]
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Register",
    element: <Register/>,
  }
]);
function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  );
}

function App() {
  return (
    <div className='app'>
      <div  className='container'>
         <RouterProvider router={router} />
      </div>
    </div>
    
  );
}

export default App;
