import 'dotenv/config';
import * as exerciseModel from './exercise_model.mjs';
import {isDateValid, createExercise, getAllExercises, findExerciseById, replaceExercise,  deleteById } from './exercise_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with name, reps, weight, unit and date provided in the body
 */
app.post('/exercises', (req, res) => {
    // Validate request body // 
    const {name, reps, weight, unit, date} = req.body;
    if (!name || typeof name !== 'string' || name.length === 0 ||
            !Number.isInteger(reps) || reps <= 0 ||
            !Number.isInteger(weight) || weight <= 0 ||
            (unit !== 'kgs' && unit !== 'lbs') ||
            !isDateValid(date)) {
        return res.status(400).json({ Error: 'Invalid request' });
    }   
    
    exerciseModel.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise => {
        res.status(201).json(exercise);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Invalid Request'});
    });
});


/**
 * Retrieve all documents in exercises collection
 */
app.get('/exercises', async (req, res) => {
    exerciseModel.getAllExercises()
    .then(exercises => {
        res.status(200).json(exercises);
    });
});


/**
 * Retrieve the exercise corresponding to the ID provided in URL
 */
app.get('/exercises/:_id', (req,res) => {
    const exerciseId = req.params._id;
    exerciseModel.findExerciseById(exerciseId)
    .then(exercise => {
        if (exercise !== null) {
            res.status(200).json(exercise);
        } else {
            res.status(404).json({Error: 'Not Found'});
        }
    })
});

/**
 * Update the exercise whose ID is provided in the path parameter and 
 * set its name, reps, weight, unit and date to the values provided in the body.
 */
app.put('/exercises/:_id', (req,res) => {
    // Validate request body // 
    const {name, reps, weight, unit, date} = req.body;
    if (!name || typeof name !== 'string' || name.length === 0 ||
            !Number.isInteger(reps) || reps <= 0 ||
            !Number.isInteger(weight) || weight <= 0 ||
            (unit !== 'kgs' && unit !== 'lbs') ||
            !isDateValid(date)) {
        return res.status(400).json({ Error: 'Invalid request' });
    }   

    exerciseModel.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date});
            } else {
                res.status(404).json({Error: 'Not Found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Invalid Request'});
        });
});


/**
 * Delete the exercise whose ID is provided in the query parameters
 */
app.delete('/exercises/:_id', (req,res) => {
    exerciseModel.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount ===1) {
                res.status(204).send();
            } else {
                res.status(404).json({Error: 'Not Found'})
            }
            })
            .catch(error => {
                console.error(error);
                res.send({Error: 'Request Failed'});
            });
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
