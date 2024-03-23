// TodoApp.js
import { useState } from "react";
import Select from 'react-select';
import { getNameList } from 'country-list';
import "./todoApp.css";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useTodos } from "../context/TodoContext"; 

export default function TodoApp() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [notes, setNotes] = useState("");
    const [error, setError] = useState(false);

    const { addTodo } = useTodos();

    const countriesOptions = Object.entries(getNameList()).map(([code, name]) => ({
        value: code,
        label: name
    }));

    const themeTooltip = createTheme({
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: '#F08080',
                        color: 'black',
                    },
                    arrow: {
                        color: '#F08080',
                    },
                },
            },
        },
    });

    const CustomDateButton = ({ value, onClick }) => (
        <button className="date-picker-button" onClick={onClick}>
            <FontAwesomeIcon icon={faCalendarAlt} />
        </button>
    );

    function handleChange(event) {
        setTitle(event.target.value);
        if (error) setError(false);
    }

    function handleSubmit(event) {
        if (event) event.preventDefault();
        if (!title.trim() || !date || !selectedCountry) {
            setError(true);
            return;
        }

        addTodo({
            title,
            date,
            country: selectedCountry.value,
            notes,
            id: crypto.randomUUID(),
            completed: false,
        });

        setTitle("");
        setDate(null);
        setSelectedCountry(null);
        setNotes("");
        setError(false);
    }

    return (
        <ThemeProvider theme={themeTooltip}>
            <div className="todoContainer">
                <h1 className="titleTodoListApp">Todo List React App</h1>
                <p className="subtitleTodoListApp">Detalles de la tarea</p>
                <form className="todoCreateForm" onSubmit={handleSubmit}>
                    <Tooltip
                        title="Para generar la actividad, es necesario que completes todos los campos."
                        open={error}
                        placement="right-start"
                    >
                        <input
                            onChange={handleChange}
                            placeholder="Escribe tu tarea aquí..."
                            className="todoInput"
                            value={title}
                            onFocus={() => setError(false)}
                        />
                    </Tooltip>
                    <Select
                        options={countriesOptions}
                        value={selectedCountry}
                        onChange={setSelectedCountry}
                        className="selectCountry"
                        placeholder="Seleccione un país..."
                    />
                    <DatePicker
                        selected={date}
                        onChange={date => setDate(date)}
                        customInput={<CustomDateButton />}
                        placeholderText="Seleccione una fecha"
                    />
                    <textarea
                        className="noteInput"
                        placeholder="Escribe tus notas aquí..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </form>
                <button className="buttonCreate" onClick={handleSubmit}>Añadir tarea</button>
            </div>
        </ThemeProvider>
    );
}
