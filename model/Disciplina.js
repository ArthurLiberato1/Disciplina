import { timingSafeEqual } from "crypto";
import DisciplinaModel from "./DisciplinaSchema";

class Disciplina{
    #nome;
    #cargaHoraria;
    #professor;

    constructor(nome,cargaHoraria,professor){
        this.#nome=nome;
        this.#cargaHoraria=cargaHoraria;
        this.#professor=professor;
    }

    async save(){
        const novaDisciplina = new DisciplinaModel({
            nome: this.#nome,
            cargaHoraria: this.#cargaHoraria,
            professor: this.#professor
        })
        return await novaDisciplina.save();
    }

    static async findAll(){
        return await DisciplinaModel.find();
    }

    static async findById(id){
        return await DisciplinaModel.findById(id);
    }

    static async findByNomeDisciplina(nome){
        return await DisciplinaModel.findOne({nome: nome});
    }

    static async deleteDisciplina(id){
        return await DisciplinaModel.findByIdAndDelete(id);
    }

    static async updateDisciplina(id,dados){
        return await DisciplinaModel.findByIdAndUpdate(id,dados,{new: true});
    }
}