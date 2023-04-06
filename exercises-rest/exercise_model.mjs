import mongoose from 'mongoose';
import 'dotenv/config';
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
*
* @param {String} date
* @param {Number} reps 
* @param {Number} weight
* @param {String} unit 
* @param {String} date
* @returns
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

//Creates new exercise document with provided properties and saves to database//
const createExercise = async(name,reps,weight,unit,date) => {
    const exercises = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercises.save();
};


//Returns a promise that resolves to an array of all Exercise documents in database//
const getAllExercises = async () => {
    return Exercise.find({});
};

//Finds and returns an Exercise document with specified _id property//
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec()
}


//Replaces Exercise document with specified _id property with a new document containing provided properties//
const replaceExercise = async(_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, { name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.matchedCount;
}

//Deletes Exercise document with specified _id property from database//
const deleteById = async(_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}
export {isDateValid, createExercise, getAllExercises, findExerciseById, replaceExercise, deleteById }; 