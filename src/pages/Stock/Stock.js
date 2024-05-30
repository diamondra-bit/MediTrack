import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from '../../components/Note/Note';
import add from '../../icone/add.svg';
import edit from '../../icone/edit.svg';
import del from '../../icone/delete.svg'
import search from '../../icone/search.svg';

function Stock() {
    const [searchTerm, setSearchTerm] = useState("");

  // Liste en cliquant sur grouper par stock
    const[stock,setStock]=useState(false)
    const[listStock,setListStock]=useState([])
    useEffect(()=>{
        const showStock = () => {
            setStock(true)
              axios.get("http://localhost:2604/get/medicineNomList")
              .then((result) => {
                     setListStock(result.data)
              })   
          }
        showStock();
    },[])
  

      // Barre de recherche
      const filteredList = listStock.filter((medicine) => {
        return medicine.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
               medicine.Date_peremption.toLowerCase().includes(searchTerm.toLowerCase()) ||
               medicine.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
               medicine.prix.toLowerCase().includes(searchTerm.toLowerCase());
      });
  
  // Vérifier l'état du stock 
  const [etatTab,setEtatTab]=useState([])
  useEffect(()=>{
   const nouveauTab=[]
  
    for (let i=0;i<listStock.length;i++){
      if(listStock[i].stock<=3){
       nouveauTab.push("Rupture de stock")
      }else{
        nouveauTab.push("Stock Normale")
      }
  }
  setEtatTab(nouveauTab)
  },[listStock])
  
  return (
   <>
      <div className='inventory'>
        <Note text="trouver la liste des médicaments et le nombre total de stocks existants pour chacun." />

        <div className='table-div'>
          <div className='nav-table'>
            <div>
           
            </div>

            <div>
              <div className='Nav-Searchbar'>
                <img src={search} alt="search" className='icone' />
                <input type='search' placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          <table className="table table-striped" >
            <thead>
              <tr>
                <th scope="col">Désignation</th>
                <th scope="col">Quantité</th>
                <th scope="col">Fournisseur</th>
                <th scope="col">Prix Unitaire</th>
                 <th scope="col">Etats</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((val, key) => (
                <tr key={val.id}>
                  <td>{val.designation}</td>
                  <td>{val.stock}</td>
                  <td>{val.fournisseur}</td>
                  <td>{val.prix}</td>
                  <td>
                    <button className={etatTab[key] === "Rupture de stock" ? "rupture" : "normale"}>
                    {etatTab[key]}
                    </button>
                 </td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Stock