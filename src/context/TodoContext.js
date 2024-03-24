// TodoContext.js
import React, { createContext, useState, useContext } from 'react';

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const addTodo = newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const updateTodo = (id, updatedFields) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, ...updatedFields } : todo
            )
        );
    };

    const completeTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => 
                todo.id === id ? { ...todo, completed: true } : todo
            )
        );
    };

    const deleteTodo = id => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, completeTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
