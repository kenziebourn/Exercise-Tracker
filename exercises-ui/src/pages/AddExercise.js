import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const AddExercise = () =>{
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('lbs');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const handleAddExercise = async () => {
    const newExercise = {name, reps, weight, unit, date};
    console.log(newExercise);

    const response = await fetch('/exercises', {
      method: 'POST',
      body: JSON.stringify(newExercise),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status === 201){
      alert("Successfully added")
    } else {
      alert(`Failed to add exercise, status code = ${response.status}`);
    }
    navigate("/");
    console.log(response);
  }
  
  return (
    <div className="row-container">
      <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={e => setName(e.target.value)}
      className='input-field'/>
      <input
      type="number"
      placeholder="Reps"
      value={reps}
      onChange={e => setReps(e.target.valueAsNumber)}
      className='input-field'/>
      <input
      type="number"
      placeholder="Weight"
      value={weight}
      onChange={e => setWeight(e.target.valueAsNumber)}
      className='input-field'/>
      <label htmlFor="select-unit"></label>
      <select name="unit" id="select-unit" className='input-field'
      onChange={e => {setUnit(e.target.value)
        console.log(e.target.value)}}>
      <option value="lbs">lbs</option>
      <option value="kgs">kgs</option>
      </select>
      <input
      type="text"
      placeholder="MM-DD-YY"
      value={date}
      onChange={e => setDate(e.target.value)} className='input-field' /> <br></br>
      <button className='button-field'
        onClick= {handleAddExercise} >Add</button>
    </div>
  )
}
export default AddExercise;
