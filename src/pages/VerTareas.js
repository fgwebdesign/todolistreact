import React from 'react';
import { useTodos } from "../context/TodoContext";
import './VerTareas.css';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const VerTareas = () => {
    const { todos, updateTodo, deleteTodo, completeTodo } = useTodos();

    const settings = {
        dots: true, // Muestra puntos de navegación en la parte inferior del carrusel
        infinite: false, // No cicla infinitamente
        speed: 500, // Velocidad de la transición
        slidesToShow: 3, // Número de diapositivas a mostrar
        slidesToScroll: 3, // Número de diapositivas para desplazar
        responsive: [
            {
                breakpoint: 768, // Para dispositivos con un ancho menor a 768px
                settings: {
                    slidesToShow: 1, // Muestra una diapositiva a la vez
                    slidesToScroll: 1, // Desplaza una diapositiva
                }
            }
        ]
    };


    return (
        <div className="verTareasContainer">
              <section className="pendingTasksContainer">
            <div className="pendingTasksContainer">
            <h2 className='TitlePendingTasks'>Tareas Pendientes</h2>
            <Slider {...settings} className="pendingTasksSlider">
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
            </Slider>
             </div>
             </section>
             
            <section className="completedTasksContainer">
            <h2 className='TitlePendingTasks'>Tareas Finalizadas</h2>
            <div className="tableContainer">
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
            </section>
            
        </div>
    );
};

export default VerTareas;
