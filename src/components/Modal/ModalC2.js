import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import successIcon from '../../icone/check.svg'

function ModalC2(props) {
  
    const [categorie,setCategorie]=useState(props.categorie);

        const handleUpdate=()=>{
            axios.put(`http://localhost:2604/put/modifyCategorie/${props.numero}`,
            {categorie:categorie })
            .then(()=>{
              Swal.fire({
                title: "Félicitation!",
                text: "Modification réussi!",
                icon:'success',
                iconHtml: `<img src="${successIcon}" style="width: 50px; height: 50px;">`, // Utilisez votre icône SVG personnalisée
                showConfirmButton: false, // Ne pas afficher de bouton de confirmation pour fermer automatiquement le SweetAlert
                timer: 2000 
              });
            })
           
        }
 
  
  return (
    <>
   <div className='overlay' >
            <div className='modal-content'> 
              <form onSubmit={handleUpdate}>
                <h3>Modification d'une catégorie</h3>
                 
               <div className='div-form'>
                  <label>Nom médicament</label>
                  <input required type='text' value={categorie} onChange={(e)=>{setCategorie(e.target.value)}}/>
                </div> 
               
                <div className='btn-form div-form'>
                   <button className='btn-modal' type='submit'>Modifier</button> 
                   <button className='btn-modal'onClick={props.handleExit2}>Annuler</button> 
                </div> 

               </form>
             
            </div>
         </div>
    </>
  )
}
export default ModalC2