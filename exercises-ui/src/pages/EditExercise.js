import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const EditExercisePage = ({exerciseToEdit}) => {
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const navigate = useNavigate();

  const editExercise = async () => {
    const editedExercise = {name, reps, weight, unit, date};
    console.log(editedExercise);

    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: 'PUT',
      body: JSON.stringify(editedExercise),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status === 200){
      alert("Successfully edited exercise")
    } else {
      alert(`Failed to edit exercise, status code = ${response.status}`);
    }
    navigate("/");
    console.log(response);
  }
  
  return (
    <div>
      <input
      type="text"
      value={name}
      onChange={e => setName(e.target.value)}/>
      <input
      type="number"
      value={reps}
      onChange={e => setReps(e.target.valueAsNumber)}/>
      <input
      type="number"
      value={weight}
      onChange={e => setWeight(e.target.valueAsNumber)}/>
      <label htmlFor="select-unit"></label>
      <select name="unit" id="select-unit"
      onChange={e => {setUnit(e.target.value)
        console.log(e.target.value)}}>
      <option value="lbs">lbs</option>
      <option value="kgs">kgs</option>
      
      </select>
      <input
      type="text"
      value={date}
      onChange={e => setDate(e.target.value)}/>
      <button
        onClick= {editExercise} >Save</button>
    </div>
  )
}
export default EditExercisePage;
