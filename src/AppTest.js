import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home';
import Main from './pages/Home/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import Inventory from './pages/Inventory/Inventory';
import Sidebar from './components/Sidebar/Sidebar';
import Stat from './pages/Stat/Stat';
import Expire from './pages/Expiré/Expire';
import Notif from './pages/Notif/Notif';
import Vente from './pages/Vente/Vente';
import Fournisseur from './pages/Fournisseur/Fournisseur';
import Stock from './pages/Stock/Stock';
import Categorie from './pages/Categorie/Categorie';
import Administration from './pages/Administration/Administration';
import Help from './pages/Help/Help';

import { NotificationProvider } from './Context/NotificationProvider';
import Log from './pages/Login/Log';
import Signup from './pages/SignUp/Signup';

function App() {
  const Main = ()=>{
    return (
      <>
        {/* <Navbar/> */}
        <NotificationProvider>
        <div className='main-contain'>
        <div className='flex'>
            <Sidebar/>
            <div className='outlet'> <Outlet/></div>
        </div>
        </div>
    </NotificationProvider>
      </>
    )
  }
  
  // Router
  const router=createBrowserRouter([
   {
    path:'/login',
      element:<Log/>
   },
   {
      path:'/signup',
      element:<Signup/>
   },
    {
      path:'/',
      element:<Main/>,
      children: [
        {
          path: '/',
          element : <Home/>
        },
        {
          path: '/notif',
          element : <Notif/>
        },
        {
          path: '/vente',
          element : <Vente/>
        },
        {
          path: '/fournisseur',
          element : <Fournisseur/>
        },
        {
          path: '/expire',
          element : <Expire/>
        },
        {
          path: '/categorie',
          element : <Categorie/>
        },
        {
          path: '/administration',
          element : <Administration/>
        },
        {
          path: '/help',
          element : <Help/>
        },
        {
          path: '/stock',
          element : <Stock/>
        },
        {
          path: '/inventory',
          element : <Inventory/>
        },
        {
          path: '/stat',
          element : <Stat/>
        }
      ]
    }
  ])
  return (
    <div className="App">
{/* 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Inventory' element={<Inventory/>}></Route>
        </Routes>
    </BrowserRouter> */}
    <RouterProvider router={router}/>
   </div>
  );
}

export default App;
