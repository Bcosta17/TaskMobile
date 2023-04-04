import  express  from 'express';
import cors from 'cors';

import UserRoutes from './routes/UserRoutes.js';
import TaskRoutes from './routes/TaskRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({credentials: true, origin: '*'}));


app.use('/user', UserRoutes);
app.use('/task', TaskRoutes);

app.listen(3000, () => {
	console.log('Servidor HTTP rodando na porta 3000');
});

