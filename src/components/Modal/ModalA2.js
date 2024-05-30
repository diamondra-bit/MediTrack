import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import successIcon from '../../icone/check.svg'

function ModalA2(props) {
  
  const [administration,setAdministration]=useState(props.administration);

  const handleUpdate=()=>{
  
      axios.put(`http://localhost:2604/put/modifyAdministration/${props.numero}`,
      {administration:administration })
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
            <input required type='text' value={administration} onChange={(e)=>{setAdministration(e.target.value)}}/>
          </div> 
         
          <div className='btn-form div-form'>
             <button className='btn-modal' type='submit'>Modifier</button> 
             <button className='btn-modal'onClick={props.handleexit2}>Annuler</button> 
          </div> 

         </form>
       
      </div>
   </div>
</>
)
}
export default ModalA2