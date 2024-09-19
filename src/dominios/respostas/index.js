const { Router } = require("express");
const yup = require("yup");
const { validarSchema } = require("../../middlewares/validacaoRotas");
const RespostasController = require("./respostas.controller");
const { garantirAutenticacaoRbac, garantirAutenticacao } = require("../../middlewares/garantirAutenticacao");

const respostasRouter = Router();
const respostasController = new RespostasController();

// const schemaPostRespostas = yup.object({
//   body: yup.object({
//     titulo: yup.string().required("Título é obrigatório"),
//     descricao: yup.string().required("Descrição é obrigatória"),
//     perguntas: yup.array(
//       yup.object({
//         descricao: yup.string().required('Descrição da pergunta é obrigatória!')
//       })
//     ),
//   }),
// });

// const schemaDeleteRespostas = yup.object({
//   params: yup.object({
//     id: yup
//       .string()
//       .uuid("Id informado não é válido")
//       .required("O Id é obrigatório!"),
//   }),
// });


// respostasRouter.use(garantirAutenticacaoRbac('criador'))
// respostasRouter.get("/", respostasController.index);
respostasRouter.use(garantirAutenticacao)
respostasRouter.post(
  "/perguntaId",
  respostasController.create
);

// respostasRouter.delete(
//   "/:id",
//   validarSchema(schemaDeleteRespostas),
//   respostasController.delete
// );

module.exports = respostasRouter;
