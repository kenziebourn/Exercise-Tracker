import React from "react";
import ExerciseList from "../components/ExerciseList";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

function HomePage ({setExerciseToEdit}) {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([])
    
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status===204){
            const newExercises= exercises.filter(m => m._id !== _id);
            setExercises(newExercises);
        } else{
            console.error(`Failed to delete the exercise with _id= ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise")
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }


    useEffect(()=> {
        loadExercises();
    }, []);


    return (
        <>
        <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </>
    );
}

export default HomePage;