import React, { useEffect, useState } from 'react'
import './Modal.css'

import { jsPDF } from 'jspdf';

function ModalPdf({ designation, prix, nombre, total, monnaie, reste }) {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a7'
        });
    
        doc.setFontSize(14);
    doc.setTextColor(69, 165, 154); // Couleur vert
    doc.text('Reçu de paiement',  20, 15, { align: 'left' });

    // Contenu
    doc.setFontSize(12);
    doc.setTextColor(0); // Couleur par défaut (noir)
    doc.text(`- Médicament : ${designation}`, 15, 30, { align: 'left' });
    doc.text(`- Prix Unitaire: ${prix} Ar`, 15, 40, { align: 'left' });
    doc.text(`- Quantité : ${nombre}`, 15, 50, { align: 'left' });
    doc.text(`- Total à payer: ${total} Ar`, 15, 60, { align: 'left' });
    doc.text(`- Monnaie : ${monnaie} Ar`, 15, 70, { align: 'left' });
    doc.text(`- Reste : ${reste} Ar`, 15, 80, { align: 'left' });

        doc.save('Facture.pdf');
        window.location.reload();
      };
      const handleExit= () => {
       window.location.reload();
      };
    
    

  return (
    <>
         <div className='overlay'>
            <div className='modal-content pdf'> 
            <h3>
            Voulez-vous imprimer?
            </h3>
            <div>
                <button className='btn-modal' onClick={generatePDF}>Imprimer</button>
                <button className='btn-modal' onClick={handleExit}>Annuler</button>
            </div>

             
            </div>
         </div>
     
    </>
  )
}


export default ModalPdf