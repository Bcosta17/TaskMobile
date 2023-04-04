import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const getUserByToken = async (token) => {
    
    if (!token) {
        return res.status(401).json({ message: 'acesso negado!' });
    }

    const decoded = jwt.verify(token, 'qafsafvsdsfwe');

    const userId = decoded.id;
        
    const user = await User.findOne({ _id: userId });

    return user;
}
export default getUserByToken;