import UserModel from "./UserSchema";

class User{
    #login;
    #senha;

    constructor(login,senha){
        this.#login=login;
        this.#senha=senha;
    }

    async save(){
        const novoUsuario = new UserModel({
            login: this.#login,
            senha: this.#senha
        });
        return await novoUsuario.save();
    }

    static async findByLogin(login){
        return await UserModel.findOne({login: login})
    }


}