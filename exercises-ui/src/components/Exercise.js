import React from "react";
import {MdEdit, MdDeleteForever} from 'react-icons/md'

function Exercise({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <th><MdEdit onClick={()=> onEdit(exercise)} size={35} className="edit-icon"/></th>
            <th><MdDeleteForever onClick={()=> onDelete(exercise._id)} size={35} className="delete-icon"/></th>
        </tr>
    )
}


export default Exercise;