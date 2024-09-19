const { Router } = require("express");
const yup = require('yup')
const { validarSchema } = require("../../middlewares/validacaoRotas");
const SessionsController = require("./sessions.controller");
const sessionsRouter = Router();
const sessionsController = new SessionsController();

const schemaPostSession = yup.object({
    body: yup.object({
      email: yup.string().required().email('Email inválido').required('Email é obrigatório'),
      senha: yup.string().required('Senha é obrigatória!')
    }),
  });


sessionsRouter.post("/", validarSchema(schemaPostSession), sessionsController.create);

module.exports = sessionsRouter;
