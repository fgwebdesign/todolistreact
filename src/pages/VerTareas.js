// VerTareas.js
import React from 'react';
import { useTodos } from "../context/TodoContext";
import './VerTareas.css';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerTareas = () => {
    const { todos, updateTodo, deleteTodo, completeTodo } = useTodos();

    // No es necesario filtrar las tareas aquí, ya que queremos que la sección de tareas finalizadas siempre esté presente

    return (
        <div className="verTareasContainer">
            <div className="pendingTasksContainer">
            <h2 className='TitlePendingTasks'>Tareas Pendientes</h2>
            {todos.filter(todo => !todo.completed).map((todo) => (
                <div key={todo.id} className="todoCard">
                    <h3 className="todoTitle">{todo.title}</h3>
                    <p className="todoDate">Fecha: {todo.date.toLocaleDateString()}</p>
                    <p className="todoCountry">País: {todo.country}</p>
                    {todo.notes && <p className="todoNotes">Notas: {todo.notes}</p>}
                    <div className="todoActions">
                        <FontAwesomeIcon icon={faEdit} onClick={() => console.log('Edit')} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />
                    </div>
                    <button className='finalizeButton' onClick={() => completeTodo(todo.id)}>Finalizar tarea</button>
                </div>
        
            ))}
             </div>

            <h2 className='TitlePendingTasks'>Tareas Finalizadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>País</th>
                        <th>Notas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.filter(todo => todo.completed).map((todo) => (
                        <tr key={todo.id} className="completedTodo">
                            <td>{todo.title}</td>
                            <td>{todo.date.toLocaleDateString()}</td>
                            <td>{todo.country}</td>
                            <td>{todo.notes}</td>
                            <td>
                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VerTareas;
