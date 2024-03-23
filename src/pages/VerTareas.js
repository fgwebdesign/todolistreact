// VerTareas.js
import React from 'react';
import { useTodos } from "../context/TodoContext";
import './VerTareas.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const VerTareas = () => {
    const { todos, updateTodo, deleteTodo } = useTodos();

    return (
        <div className="verTareasContainer">
            {todos.map((todo) => (
                <div key={todo.id} className="todoCard">
                    <h3 className="todoTitle">{todo.title}</h3>
                    <p className="todoDate">Fecha: {todo.date.toLocaleDateString()}</p>
                    <p className="todoCountry">País: {todo.country}</p>
                    {todo.notes && <p className="todoNotes">Notas: {todo.notes}</p>}
                    <div className="todoActions">
                        <FontAwesomeIcon icon={faEdit} onClick={() => console.log('Edit')} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VerTareas;
