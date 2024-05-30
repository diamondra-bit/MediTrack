import React, { useEffect, useState } from 'react'
import './Modal.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import successIcon from '../../icone/check.svg'

function ModalF(props) {
    const [nom,setNom]=useState("");
    const [adresse,setAdresse]=useState("");
    const [email,setEmail]=useState("");
  
    const [modal,setModal]=useState(props.modal)
  
    const handleAdd=()=>{
      axios.post('http://localhost:2604/post/createFour',
      {nom:nom,adresse:adresse,email:email})
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
    <div className='overlay'>
            <div className='modal-content'> 
              <form onSubmit={handleAdd}>
                <h3>Ajout d'un fournisseur</h3>
  
               <div className='div-form'>
                  <label>Nom </label>
                  <input required type='text' onChange={(e)=>{setNom(e.target.value)}}/>
                </div> 

                <div className='div-form'>
                  <label>Adresse</label>
                  <input required type='text' onChange={(e)=>{setAdresse(e.target.value)}}/>
                </div> 

                <div className='div-form'>
                  <label>Email</label>
                  <input required type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                </div> 
     
                <div className='btn-form div-form'>
                    <button className='btn-modal' type='submit'>Ajouter</button>
                    <button className='btn-modal' onClick={props.handleexit}>Annuler</button> 
                </div> 

               </form>
             
            </div>
         </div>
     
  )
}

export default ModalF