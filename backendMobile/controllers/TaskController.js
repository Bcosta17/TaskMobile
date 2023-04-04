import Task from '../models/Task.js';

import getToken from '../helpers/get-token.js';
import getUserByToken from '../helpers/get-user-by-token.js';

import ObjectId from 'mongoose';
import moment  from 'moment';

export default class TaskController{
    
    static async create(req, res) {

        const token = getToken(req);

        const user = await getUserByToken(token);

        
        const { desc, estimateAt, doneAt } = req.body;

        // validations
        if (!desc) {
            res.status(422).json({ message: "O campo descrição é obrigatório!" });
            return;
        }
        //

        const task = new Task({
            desc,
            estimateAt,
            doneAt:null,
            user
        });

        try {
          
          
            const novaTask = await task.save();
            
            res.status(201).json({
                message: 'Task criada com sucesso!',
                novaTask,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    
    static async getTasks(req, res) {

        const date = req.params.maxDate ? req.params.maxDate : moment();
        console.log(req.params.maxDate)
        // 
        const token = getToken(req);
        const user = await getUserByToken(token);
      
        const task = await Task.find({ 'user': user._id})
                    .where('estimateAt').lt(date)
                    .sort('-createdAt')
                    .select('-senha');
                 

        res.status(200).json({ data: task});

    }

    static async delete(req, res) {
        console.log(req.body)

        const id = req.params.id;
        // 
        console.log(id)
        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido!' });
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        const task = await Task.findOne({ _id: id });

        if (!task) {
            res.status(404).json({ message: 'Task não encontrada' });
            return;
        }

        if (task.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Houve um problema em processar sua solicitação!' });
            return;
        }

        await Task.findByIdAndRemove(id);

        res.status(200).json({ message: 'Task deletada com sucesso!' });

    }

    static async updateTaskDoneAt(req, res, doneAt) {
       
        const id = req.params.id;
       
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido' });
            return;
        }

        const task = await Task.findOne({ _id: id });

        if (!task) {
            res.status(404).json({ message: 'Task não encontrada' });
            return;
        }

        if (task.user._id.toString() !== user._id.toString()) {
            res.status(404).json({ message: 'Houve um problema em processar sua solicitação!' });
            return;
        }
        
        task.doneAt = task.doneAt ? null: new Date()

        try {

            await Task.findOneAndUpdate(
                { _id: task._id },
                { $set: task },
                { new: true },
            );

            res.status(200).json({ message: 'Task atualizada com sucesso!' });

        } catch (error) {

            res.status(500).json({ message: error.message });
        }
    }

}