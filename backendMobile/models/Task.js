import mongoose from '../db/conn.js';

const { Schema } = mongoose;

const Task = mongoose.model(
    'Task',
    new Schema({
        desc: {
            type: String,
            required: true,
        },
        doneAt: {
            type: Date,   
        },
        estimateAt: {
            type: Date,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
      },
      {timestamps: [{ createdAt: new Date(new Date()) }, { updatedAt: new Date(new Date()) }]},
    ),
)


export default Task;