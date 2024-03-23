import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TodoApp from './components/todoApp';
import VerTareas from './pages/VerTareas';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <Router>
      <TodoProvider>
        <div className='app-container'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<TodoApp />} />
            <Route path="/crear" element={<TodoApp />} />
            <Route path="/vertareas" element={<VerTareas />} />
          </Routes>
        </div>
      </TodoProvider>
    </Router>
  );
}

export default App;
