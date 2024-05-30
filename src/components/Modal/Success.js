import React, { useEffect, useState } from 'react'
import './Modal.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import successIcon from '../../icone/check.svg'

function Success(props) {

  return (
    <div className=''>
            <div className='modal-content'> 
             Ajout réussi
            </div>
         </div>
     
  )
}

export default Success