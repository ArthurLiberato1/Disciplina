import path from 'path'
import __dirname from '../util/pathUtils'
import Disciplina from '../model/Disciplina'

class DisciplinaController{
    static async getAll(req,res){
        try{
            const disciplinas= await Disciplina.findAll();
            res.json(disciplinas);
        }
        catch(error){
            console.error("Erro ao obter todas as disciplinas!",error);
            res.status(500).json({message: 'Erro interno!'})
        }
    }

    static async renderGetAll(req,res){
        try{
            const disciplinas=await Disciplina.findAll();
            res.render('visualizar-disciplinas', { disciplinas: disciplinas });

        }catch(error){
            console.error("Erro ao atualizar a página!",error);
            res.status(500).json({message:'Erro interno'})
        }
    }

    static async getById(req,res){
        try{
            const {id}=req.params;

            const disciplina= await Disciplina.findById(id);
            if(!disciplina)
                return res.status(404).json({message: "Disciplina não encontrada!"})
            res.status(200).json(disciplina)
        }catch(error){
            console.error('Erro ao obter disciplina por id',error);
            res.status(500).json({message: "erro interno"})
        }
    }

    static async create(req,res){
        try{
            const {nome,cargaHoraria,professor}=req.body;
            const existe= await Disciplina.findByNomeDisciplina(nome);
            if(existe){
                return res.status(400).json({message:"Erro, já existe uma disciplina com esse nome!"})
            }
            const novaDisciplina=new Disciplina(nome,cargaHoraria,professor);
            await novaDisciplina.save();
            res.status(201).json(novaDisciplina)

        }catch(error){
            console.error('Erro ao criar disciplina!');
            res.status(500).json({message: "Erro interno"})
        }
    }

    static async renderCreateDiscplina(req,res){
        try{
            res.sendFile(path.join(__dirname,'views','cadastrar-disciplina'));
        }catch(error){
            console.error("Erro ao carregar a página",error);
            res.status(500).json({message: 'Erro interno'})
        }
    }

    static async delete(req,res){
        try{
            const {id} = req.params;
            const disciplinaRemovida= await Disciplina.deleteDisciplina(id);
            if(!disciplinaRemovida){
                return res.status(404).json({message:"Disciplina não encontrada para remover!"})
            }
            res.json({message:'Disciplina removida com sucesso!'})
        }catch(error){
            console.error("Erro ao remover disciplina!",error);
            res.status(500).json({message: "Erro interno"})
        }

    }

    static async update(req,res){
        try{
            const {id} = req.params;
            const {nome,cargaHoraria,professor}=req.body;
            const existe= await Disciplina.findById(id);
            if(!existe){
                return res.status(404).json({message: 'Erro, disciplina não encontrada!'});
            }
            const atualizado = await Disciplina.updateDisciplina(
                id,
                {nome,cargaHoraria,professor},
                {new: true}
            );
            res.json(atualizado);
        }catch(error){
            console.error('erro ao alterar disciplina',error);
            res.status(500).json({message: "erro interno"})
        }
    }
}

export default DisciplinaController;