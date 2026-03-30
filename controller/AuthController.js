import User from '../model/User.js'
import __dirname from '../util/pathUtils';
import path from 'path';

class AuthController{
    static async renderLogin(req,res){
        res.render('login');
    }

    static async login(req,res){
        try{
            const {login, senha}=req.body;
            const usuario= await User.findByLogin(login);
            if(!usuario){
                return res.status(404).json({message: 'Usuário não encontrado'})
            }
            if(usuario.senha===senha){
                req.session.user={
                    id: usuario._id,
                    login: usuario.login
                };
                return res.redirect('disciplinas-list');
            }
            else{
                return res.json({message: "Erro, senha inválida"})
            }
        }catch(error){
            console.error("Erro ao fazer login",error);
            res.status(500).json({message: "Erro interno"})
        }
    }
}