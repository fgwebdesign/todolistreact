import React from 'react';
import { useTodos } from "../context/TodoContext";
import './VerTareas.css';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ModalTareas from '../components/ModalTareas';

const VerTareas = () => {
    const { todos, updateTodo, deleteTodo, completeTodo } = useTodos();
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [selectedTodo, setSelectedTodo] = React.useState(null);

    const openModalWithTodo = (todo) => {
        setSelectedTodo(todo);
        setModalOpen(true);
      };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };


    return (
        <div className="verTareasContainer">
            <section className="pendingTasksContainer">
            <h2 className='TitlePendingTasks'>Tareas Pendientes</h2>
                <div className="pendingTasksContainer">
                  
                    <Slider {...settings} className="pendingTasksSlider">
                        {todos.filter(todo => !todo.completed).map((todo) => (
                            <div key={todo.id} className="todoCard" onClick={() => openModalWithTodo(todo)}>
                                <h3 className="todoTitle">{todo.title}</h3>
                                <p className="todoDate">Fecha: {todo.date.toLocaleDateString()}</p>
                                <p className="todoCountry">País: {todo.country}</p>
                                <div className="todoActions">
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />
                                </div>
                                <button className='finalizeButton' onClick={() => completeTodo(todo.id)}>Finalizar tarea</button>
                            </div>
                        ))}
                    </Slider>
                    <ModalTareas isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                        <h2>{selectedTodo?.title}</h2>
                        <p><strong>Fecha:</strong> {selectedTodo?.date.toLocaleDateString()}</p>
                        <p><strong>País:</strong> {selectedTodo?.country}</p>
                        <p><strong>Notas:</strong> {selectedTodo?.notes}</p>
                    </ModalTareas>

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
