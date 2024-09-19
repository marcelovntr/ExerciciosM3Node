const { Router } = require("express");
const yup = require("yup");
const { validarSchema } = require("../../middlewares/validacaoRotas");
const RespostasController = require("./respostas.controller");
const { garantirAutenticacaoRbac, garantirAutenticacao } = require("../../middlewares/garantirAutenticacao");

const respostasRouter = Router();
const respostasController = new RespostasController();

const schemaPostRespostas = yup.object({
  body: yup.object({
    conteudo: yup.string().required("Conteúdo da resposta é obrigatório"),
    perguntaId: yup.string().required("Id da pergunta é necessário"),
    usuarioId: yup.string().required("Id de usuário é necessário"),
  }),
});

respostasRouter.use(garantirAutenticacaoRbac(['estudante']))
respostasRouter.post(
  "/perguntaId", validarSchema(schemaPostRespostas),
  respostasController.create
);


module.exports = respostasRouter;
