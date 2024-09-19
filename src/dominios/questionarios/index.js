const { Router } = require("express");
const yup = require("yup");
const { validarSchema } = require("../../middlewares/validacaoRotas");
const QuestionariosController = require("./questionarios.controller");
const { garantirAutenticacao, garantirAutenticacaoRbac } = require("../../middlewares/garantirAutenticacao");

const questionariosRouter = Router();
const questionariosController = new QuestionariosController();

const schemaPostQuestionarios = yup.object({
  body: yup.object({
    titulo: yup.string().required("Título é obrigatório"),
    descricao: yup.string().required("Descrição é obrigatória"),
    perguntas: yup.array(
      yup.object({
        descricao: yup.string().required('Descrição da pergunta é obrigatória!')
      })
    ),
  }),
});

const schemaDeleteQuestionarios = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id informado não é válido")
      .required("O Id é obrigatório!"),
  }),
});


questionariosRouter.use(garantirAutenticacaoRbac('criador'))
questionariosRouter.get("/", questionariosController.index);

questionariosRouter.post(
  "/",
  validarSchema(schemaPostQuestionarios),
  questionariosController.create
);

questionariosRouter.delete(
  "/:id",
  validarSchema(schemaDeleteQuestionarios),
  questionariosController.delete
);

module.exports = questionariosRouter;
