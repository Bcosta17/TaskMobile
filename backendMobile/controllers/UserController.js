import User from "../models/User.js";
import bcrypt from 'bcrypt';
import createUserToken from "../helpers/create-user-token.js";

export default class UserController{
    static async registro(req, res) {
       
        const { name, email, password } = req.body;
        // validations
        if (!name) {
            res.status(422).json({ message: "O campo nome é obrigatório!" });
            return;
        }
        if (!email) {
            res.status(422).json({ message: "O campo e-mail é obrigatório!" });
            return;
        }
        if (!password) {
            res.status(422).json({ message: "O campo senha é obrigatório!" });
            return;
        }
        
        const userExist = await User.findOne({ email: email.toString().toLowerCase() });
        

        if (userExist) {
            res.status(422).json({ message: "há um usuário cadastrado com este e-mail!" });
            return;
        }
       
        //criptografa a senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email:email.toString().toLowerCase(),
            password: passwordHash,
        });

        try {

            const newUser = await user.save();
            await createUserToken(newUser, req, res);

        } catch (error) {

            res.status(500).json({ message: error });

        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        if (!email) {
            res.status(422).json({ message: "O e-mail é obrigatório!" });
            return;
        }

        if (!password) {
            res.status(422).json({ message: "A senha é obrigatória!" });
            return;
        }

        // checa se email já está cadastrado
        const user = await User.findOne({ email: email.toString().toLowerCase() });
        

        if (!user) {
            res.status(422).json({ message: "Não há usuário cadastrado com este e-mail!" });
            return;
        }

        // checa se a senha está correta
        const checkPassword = await bcrypt.compare(password, user.password);
    
 
        if (!checkPassword) {
            res.status(422).json({ message: "Senha invalida!" });
            return;
        }

        await createUserToken(user, req, res);
    }

}