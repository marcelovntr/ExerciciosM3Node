const { Router } = require("express");
const yup = require('yup')
const { validarSchema } = require("../../middlewares/validacaoRotas");
const UsuariosController = require("./usuarios.controller");
const { garantirAutenticacaoRbac } = require("../../middlewares/garantirAutenticacao");
const usuariosRouter = Router();
const usuariosControllers = new UsuariosController();

const schemaPostUsuario = yup.object({
    body: yup.object({
      nome: yup.string().required("Nome é obrigatório"),
      sobrenome: yup.string().required("Descrição é obrigatória"),
      email: yup.string().required().email('Email inválido').required('Email é obrigatório'),
      senha: yup.string().min(3, 'Mínimo de 3 caracteres').max(16, 'Máximo de 16 caracteres').required('Senha é obrigatória!'),
      permissoes: yup.oneOf(['criador', 'estudante'], 'Permissão não encontrada'),
    }),
  });


usuariosRouter.get("/usuarios", garantirAutenticacaoRbac(['criador','estudante']), usuariosControllers.index); //(request, response) => {
//return usuariosControllers.index(request, response)
//return response.json(usuarios);

usuariosRouter.post("/usuarios", validarSchema(schemaPostUsuario), usuariosControllers.create);

usuariosRouter.delete("/usuarios/:id", garantirAutenticacaoRbac(['criador','estudante']), usuariosControllers.delete);
module.exports = usuariosRouter;
