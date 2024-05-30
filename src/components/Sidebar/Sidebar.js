import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import home from '../../icone/home.svg'
import chart from '../../icone/chart.svg'
import expired from '../../icone/expired.svg'
import stock from '../../icone/stock.svg'
import drug from '../../icone/drug.svg'
import list from '../../icone/list.svg'
import administration from '../../icone/administration.svg'
import category from '../../icone/category.svg'
import person from '../../icone/person.svg'
import buy from '../../icone/buy.svg'
import logo from '../../icone/logo.svg'

function Sidebar() {
  return (
    <>
    
        <div className='sidebar'>
        <div className='logo'>
         <span className='logo-img'><img src={logo}/></span>
            MediTrack</div>
        
            <ul>
                <li>
                <Link to="/">
                    <div className='sidebar-link'>
                        <img src={home}/>
                        <h5> Acceuil</h5>
                    </div>
                </Link>
                </li>

                <li>
                    <Link to="/vente">  
                     <div className='sidebar-link'>
                        <img src={buy}/>
                        <h5>Caisse</h5>
                    </div></Link>
                    </li>

                <li>
                <div className='lien'>  
                     <div className='sidebar-link'>
                        <img src={stock}/>
                        <h5> Médicament</h5>
                    </div>
                </div>
                <ul >

                <li>
                 <Link to="/fournisseur">  
                     <div className='sidebar-link'>
                        <img src={person}/>
                        <h5> Fournisseur</h5>
                    </div>
                 </Link>
                </li>
                <li>
                    <Link to="/inventory">  
                     <div className='sous-link'>
                        <img src={list}/>
                        <h5> Liste</h5>
                    </div>
                    </Link>
                    </li>
                
                <li>
                        <Link to="/categorie">  
                        <div className='sous-link'>
                            <img src={category}/>
                            <h5> Catégorie</h5>
                        </div>
                        </Link>
                </li>
                <li>
                        <Link to="/administration">
                            <div className='sous-link'>
                                <img src={administration}/>
                                <h5>Utilisation </h5>
                            </div></Link>
                </li>

                    <li>
                    <Link to="/expire">
                        <div className='sous-link'>
                            <img src={expired}/>
                            <h5>Expiré </h5>
                        </div></Link>
                    </li>

                    <li>
                    <Link to="/stock">
                    <div className='sous-link'>
                        <img src={drug}/>
                        <h5>Stock </h5>
                    </div></Link>
                    </li>
                    <li>
                    <Link to="/stat">
                        <div className='sous-link'>
                            <img src={chart}/>
                            <h5> Statistique</h5>
                        </div>
                        </Link>
                
                    </li>
                </ul>
                </li>
            </ul>
                
        </div>
    </>
  )
}

export default Sidebar