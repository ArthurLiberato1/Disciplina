import mongoose from 'mongoose'

const DisciplinaSchema=mongoose.Schema(
    {
        nome: {type: String, required: true},
        cargaHoraria: {type: Number, required: true},
        professor: {type:String,required: true}
    },
    {
        timestamps:true
    }
);

const DisciplinaModel=mongoose.model('Disciplina',DisciplinaSchema);

export default DisciplinaModel;