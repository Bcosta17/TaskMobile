import mongoose from '../db/conn.js';
const { Schema } = mongoose;

const  User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
           
        },
      },
      {timestamps: [{ createdAt: new Date(new Date()) }, { updatedAt: new Date(new Date()) }]},
    ),)
export default User;