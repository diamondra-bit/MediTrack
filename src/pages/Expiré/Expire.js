import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from '../../components/Note/Note';
import search from '../../icone/search.svg';
import {differenceInDays} from 'date-fns'

function Expire() {

  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentDate,setCurrentDate]=useState('');
  const [perime,setPerime]=useState([]);
  const nouveauTab=[];

  useEffect(() => {
    const showMedicine = () => {
      const getDate=()=>{
        const today=new Date();
        setCurrentDate(today.toLocaleDateString());
        }
        getDate();

      axios.get("http://localhost:2604/get/medicineList")
        .then((result) => {
          setList(result.data);
      
          if(result.data){
            for (let i=0;i<list.length;i++){
              const isoDate1 = new Date(currentDate.split('/').reverse().join('-')).toISOString().split('T')[0];
              const isoDate2 = result.data[i].Date_peremption;
             const dateI=differenceInDays(isoDate2,isoDate1);
             
              if(isoDate1>=isoDate2){
                nouveauTab.push("Périmé")    
              }
              else if (dateI<=3){
                nouveauTab.push("Peremption imminente")
              }
              else{
                nouveauTab.push("Non périmé")
              }
            }
          }
            
            setPerime(nouveauTab)
          
        })
    }
    showMedicine();
  }, [currentDate,perime]);

  // Barre de recherche
  const filteredList = list.filter((medicine) => {
    return medicine.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
           medicine.Date_peremption.toLowerCase().includes(searchTerm.toLowerCase()) ||
           medicine.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
           medicine.prix.toLowerCase().includes(searchTerm.toLowerCase())
           ;
  });
 
  return (
    <>
    <div className='inventory'>
        <Note text="trouver la liste des médicaments dont la date de péremption est imminente." />

        <div className='table-div'>
          <div className='nav-table'>
            <div> </div>

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
                <th scope="col">Numéro</th>
                <th scope="col">Désignation</th>
                <th scope="col">Date peremption</th>
                <th scope="col">Fournisseur</th>
                <th scope="col">Prix Unitaire</th>
                <th scope="col">Etats</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((val, key) => (
            
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.designation}</td>
                  <td>{val.Date_peremption}</td>
                  <td>{val.fournisseur}</td>
                  <td>{val.prix}</td>
                  <td >
                  <span className={perime[key] === "Peremption imminente" ? "attention" : perime[key] === "Non périmé" ? "normale" : perime[key] === "Périmé" ? "rupture" : undefined}>
                  {perime[key]}
                </span>

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

export default Expire