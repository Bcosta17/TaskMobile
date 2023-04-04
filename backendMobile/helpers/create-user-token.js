import jwt from 'jsonwebtoken';

const createUserToken = async (user, req, res) => {
    
    // create a token
    const token = jwt.sign({ name: user.name, id: user._id, email: user.email }, "qafsafvsdsfwe"); // secret, string para deixar o token unico

    // return token
    res.status(200).json({ token: token, email: user.email, nome: user.name});  
}

export default createUserToken; 