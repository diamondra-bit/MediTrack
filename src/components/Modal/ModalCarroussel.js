// Carrousel.js
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import './Carroussel.css'
import previous from '../../icone/previous.svg'
import next from '../../icone/next.svg'

const content = [
  {
     title: 'Acceuil',
        title1: 'Rupture de Stock',
        description1: ' Vous pouvez voir la liste des médicaments en rupture de Stock',
       
   },
   { title: 'Acceuil',
        title1: 'Peremption imminente',
        description1: ' Vous pouvez voir la liste des médicaments en cours de peremption ou périmé',
   },
   { title: 'Acceuil',
         title1: ' Dernières ventes',
        description1: ' Vous aurez la liste de tous les transactions enregistrés selon la plus récente',
   },
   {title: 'Acceuil',  
         title1: 'Calendrier',
        description1: 'Vous aurez un calendrier pour pouvoir identifier la date du jour',
   },
   {    title: 'Acceuil',
        title1: ' Notification ',
        description1: 'Tous les médicaments périmés ou en cours de peremption seront notifié',       
  },
  
  {
    title: 'Fournisseur',
    title1: ' Liste des fournisseurs',
       description1: ' Vous pouvez enregistrer tous les fournisseurs de vos médicaments avec leurs contacts',
   },

    {
        title: 'Caisse',
           title1: 'Achat de médicament',
           description1: "C'est ici que vous enregistrer toutes les ventes des médicaments",
    },
    {
        title: 'Médicament',
           title1: 'Catégorie',
           description1: "Vous pouvez enregistrer et voir les familles de médicaments",
    },
    {
        title: 'Médicament',
           title1: 'Utilisation',
           description1: "Vous pouvez enregistrer les voies d'administrations de médicament ici",
    },
    {
        title: 'Médicament',
           title1: 'Liste ',
           description1:"Vous aurez la liste de tous les médicaments avec tous les détails leur concernant", },
    {
        title: 'Médicament',
           title1: 'Expiré',
           description1: "Ici,vous pouvez suivre la date de peremption des médicaments",
    },
    {
        title: 'Médicament',
           title1: 'Stock',
           description1:"Ici , vous pouvez voir la quantité en stock de chaque médicament",
    },
 
];

const ModalCarrousel = ({handleExit}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const index = (currentIndex - 1 + content.length) % content.length;
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    const index = (currentIndex + 1) % content.length;
    setCurrentIndex(index);
  };



  return (
    <div className='overlay ' >
      <div className='modal-content modal-content-carroussel'> 
          <div className="carrousel">
          <div className='left'>
               <img className='carrousel-button left' onClick={goToPrevSlide} src={previous}/>
          </div> 
          <div className="slide-content">
              <h3>{content[currentIndex].title}</h3>
              
              <p> <span className='h4'>{content[currentIndex].title1} :</span> 
              {content[currentIndex].description1}</p>
              <button className='btn-modal' onClick={handleExit}>Annuler</button>
    
          </div>
          <div className='left'>
          <img src={next} className='carrousel-button right' onClick={goToNextSlide}/>
          </div> 
          </div>
           </div>
      </div>
  );

};

export default ModalCarrousel;
