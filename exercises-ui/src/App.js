import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/Homepage';
import AddExercise from './pages/AddExercise';
import EditExercisePage from './pages/EditExercise';
import {HiSparkles} from 'react-icons/hi';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();
  return (
    <div className="App">
      <header className="App-header">
      <h1><HiSparkles size={32}/> Exercise Tracker <HiSparkles size={32}/></h1>
      <p>*To get started, please add an exercise. From there, you are 
        able to change, <br></br>update and delete the exercises.</p>
      <Router>
        <Navigation />
          <Routes>
            <Route path='/' element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
            <Route path='/Home' element={<HomePage setExerciseToEdit={setExerciseToEdit}  />} />
            <Route path='/add-exercise' element={<AddExercise />} />
            <Route path='/edit-exercise' element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} />
          </Routes>
      </Router>
      </header>
      <footer> © 2023 McKenzie Bourn</footer>
    </div>
  );
}

export default App;
