import React, { useState } from 'react'
import search from '../../icone/search.svg'
import notif from '../../icone/notif.svg'
import help from '../../icone/help-nav.svg'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useNotification } from '../../Context/NotificationProvider'
import ModalCarroussel from '../Modal/ModalCarroussel'


function Navbar(props) {
  const { totalNotifications } = useNotification();

  const[modal,setModal]=useState(false);
  const showHelp=()=>{
    setModal(!modal)
  }

  const handleExit=() => {
    // window.location.reload();
    setModal(false)
  };

 
  return (
    <>
        <div className='home-nav'>
          <div className='container-text'>
            <span className='text first-text'>Bienvenue sur </span>
            <span className='text sec-text'>MediTrack!</span>
          </div>

          <div className='nav-link'>
            
              <div className='notif'>{totalNotifications}</div>
              <div className='navbar-parameter '>
                 <Link to="/notif"><img src={notif}/>
                 </Link> 
                 <button  onClick={showHelp}><img src={help}/></button>
                 {modal && <ModalCarroussel handleExit={handleExit}/>} 
              </div>
          </div>
                    
        </div>
    </>
  )
}

export default Navbar