import express from 'express'
import DisciplinaController from "../controller/DisciplinaController";
import {ratedLimit} from "../middlewares/middlewares";
import AuthController from "../controller/AuthController"
import auth from '../middlewares/auth'
const router=express.Router();

router.get('/login',AuthController.renderLogin);
router.post('/login',AuthController.login);

router.get('/disciplinas-list',auth,DisciplinaController.renderGetAll);
router.get('/disciplinas-create',auth,DisciplinaController.renderCreateDiscplina);

router.get('/disciplinas',auth,DisciplinaController.getAll);
router.get('/disciplinas/:id',auth,DisciplinaController.getById);
router.post('/disciplinas',auth,DisciplinaController.create);
router.delete('/disciplinas/:id',auth,DisciplinaController.delete);
router.put('/disciplinas/:id',auth,ratedLimit,DisciplinaController.update);

export default router;