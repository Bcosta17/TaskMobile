import jwt from 'jsonwebtoken';

import getToken from './get-token.js';


// middleware para valida o token
const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso negado'});
    }

    const token = getToken(req)

    if(!token){
        return res.status(401).json({ message: 'Acesso negado'});
    }

    try {
        const verify = jwt.verify(token, "qafsafvsdsfwe");
        req.user = verify;
        next();
    
    } catch (error) {
        return res.status(400).json({ message: 'token invalido'});    
    }
}

export default checkToken;