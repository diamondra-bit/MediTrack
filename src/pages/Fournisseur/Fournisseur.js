import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from '../../components/Note/Note';
import add from '../../icone/add.svg';
import edit from '../../icone/edit.svg';
import del from '../../icone/delete.svg'
import search from '../../icone/search.svg';
import ModalF from '../../components/Modal/ModalF';
import Modal2F from '../../components/Modal/Modal2F';

import Swal from 'sweetalert2';

function Fournisseur() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [userId, setUserId] = useState("");
  
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const showfournisseur = () => {
      axios.get("http://localhost:2604/get/fournisseurList")
        .then((result) => {
          setList(result.data);
        })
    }
    showfournisseur();
  }, []);

  const handleDelete = (idDel) => {
    axios.put(`http://localhost:2604/delete/deleteFour/${idDel}`)
      .then(() => {
        Swal.fire({
          title: "Félicitation!",
          text: "Suppression réussi!",
          icon:'success',
           showConfirmButton: false, // Ne pas afficher de bouton de confirmation pour fermer automatiquement le SweetAlert
          timer: 2000 
        }); 
        window.location.reload();
      })
  }
  const handleModal2=(id,design,adresse,dateP,idF)=>{
    setModal2(!modal2)
    setUserId(id);
    setNom(design);
    setAdresse(adresse)
    setEmail(dateP)
  }


  const filteredList = list.filter((four) => {
    return four.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
           four.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
           four.email.toLowerCase().includes(searchTerm.toLowerCase())
  });

  const handleexit= () => {
    setModal(false)
  }
  const handleexit2= () => {
    setModal2(false)
  }

  return (
    <>
      {modal && <ModalF modal={modal} handleexit={handleexit}/>}
      {modal2 && <Modal2F handleexit2={handleexit2} userId={userId}  nom={nom} adresse={adresse} email={email} />}

      <div className='inventory'>
        <Note text="trouver la liste des fournisseurs avec leur adresse et leur email." />

        <div className='table-div'>
          <div className='nav-table'>
            <div>
              <button type="button" onClick={() => setModal(!modal)} className="btn btn-primary table-btn">
                <img src={add} alt="add" />
                Ajouter
              </button>
            </div>
            <div>
              <div className='Nav-Searchbar'>
                <img src={search} alt="search" className='icone' />
                <input type='search' placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Numéro</th>
                <th scope="col">Nom</th>
                <th scope="col">Adresse</th>
                <th scope="col">Email</th>
                <th scope="col" rowSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((val, key) => (
                <tr key={val.idF}>
                  <td>{val.idF}</td>
                  <td>{val.fournisseur}</td>
                  <td>{val.adresse}</td>
                  <td>{val.email}</td>
                  <td>
                    <button onClick={() => handleModal2(val.idF,val.fournisseur, val.adresse, val.email)}>
                       <img src={edit}/>
                  </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(val.idF)}>
                      <img src={del}/>
                    </button>
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

export default Fournisseur