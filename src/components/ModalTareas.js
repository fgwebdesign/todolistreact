import React from 'react';
import './modal.css'; 

const ModalTareas = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalTareas;
