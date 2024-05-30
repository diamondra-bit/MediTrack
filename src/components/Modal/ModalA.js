import React, { useEffect, useState } from 'react'
import './Modal.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Assurez-vous d'importer le CSS de SweetAlert2
import successIcon from '../../icone/check.svg'

function ModalA(props) {
  const [administration,setAdministration]=useState("");
  
  //Ajouter
  const handleAdd=()=>{
    axios.post('http://localhost:2604/post/createAdministration',
    {administration:administration})
    .then(()=>{
      Swal.fire({
        title: "Félicitation!",
        text: "Ajout réussi!",
        icon:'success',
        iconHtml: `<img src="${successIcon}" style="width: 50px; height: 50px;">`, // Utilisez votre icône SVG personnalisée
        showConfirmButton: false, // Ne pas afficher de bouton de confirmation pour fermer automatiquement le SweetAlert
        timer: 2000 
      }); 
    })
  }

  return (
    <>
         <div className='overlay'>
            <div className='modal-content'> 
              <form onSubmit={handleAdd}>
                <h3>Ajout d'une voie d'administration</h3>
  
               <div className='div-form'>
                  <label>Voie d'administration</label>
                 <input required type='text' onChange={(e)=>{setAdministration(e.target.value)}}/>
                </div> 

                <div className='btn-form div-form'>
                   <button className='btn-modal' type='submit'>Ajouter</button>
                    <button className='btn-modal' onClick={props.handleexit}>Annuler</button> 
                </div> 

               </form>
             
            </div>
         </div>
     
    </>
  )
}


export default ModalA