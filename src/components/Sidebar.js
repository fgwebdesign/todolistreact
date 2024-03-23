// Sidebar.js
import React from 'react';
import './sidebar.css';
import logo from '../images/todolistlogo.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <img src={logo} alt="Logo" className="sidebar-logo" />
            <Link to="/crear" className="sidebar-item">Crear tareas</Link>
            <Link to="/vertareas" className="sidebar-item">Ver Tareas</Link>
            <div className="sidebar-item">Calendario</div> 
        </div>
    );
};

export default Sidebar;
