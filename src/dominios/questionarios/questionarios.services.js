const { v4: uuid } = require("uuid");
const {
  Questionarios,
  Perguntas,
} = require("../../database/models/questionarios");

// const questionario = [
//   {
//     id: 1,
//     nome: "feio",
//     idade: 23,
//     sobrenome: "dadada",
//     email: "fafa@gmail.com",
//     senha: "dhj$$23",
//     createdAt: "2024-08-20",
//   },
//   {
//     id: 2,
//     nome: "bonito",
//     idade: 25,
//     sobrenome: "pqpqpq",
//     email: "pqp@gmail.com",
//     senha: "dsaj$$23",
//     createdAt: "2024-08-21",
//   },
// ];

//data transfer object - DTO

class QuestionarioServices {
  async list(carregarPerguntas = false) {
    let questionario;

    if (carregarPerguntas) {
      questionario = await Questionarios.scope("carregarPerguntas").findAll();
    } else {
      questionario = await Questionarios.findAll();
    }
    return questionario;
  }

  async create(titulo, descricao, perguntas) {//(questionarioDTO) e perguntas como adição posterior
    const questionario = await Questionarios.create(
      {
        titulo,
        descricao,
        perguntas,
      },
      {
        include: [{model: Perguntas, as: 'perguntas'}], //include: ["perguntas"],
      }
    );
    return questionario;
  }
  update() {}
  async delete(id) {
    const questionarioExistente = await Questionarios.findByPk(id);

    if (!questionarioExistente) {
      return false;
    }
    await questionarioExistente.destroy();
    return true;
  }
}

module.exports = QuestionarioServices;
