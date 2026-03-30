import monogoose from 'mongoose';

const UserSchema= new monogoose.Schema(
    {
        login: {type: String, required: true, unique: true},
        senha: {type: String, required: true}
    },
    {
        timestamps:true
    }

);

const UserModel=monogoose.model('User',UserSchema);

export default UserModel;