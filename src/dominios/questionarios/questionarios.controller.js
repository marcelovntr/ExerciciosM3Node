const QuestionarioService = require("./questionarios.services");

const questionariosServices = new QuestionarioService();

class QuestionariosController {
  /**
   *
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @returns
   */
  async index(request, response) {
    const { carregarPerguntas } = request.query;
    const listaQuestionarios = await questionariosServices.list(carregarPerguntas);
    return response.json(listaQuestionarios);
  }
  /**
   *
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @returns
   */
  async create(request, response) {
    const { body } = request;

    const questionario = await questionariosServices.create(body);

    return response.json(questionario);
  }
  /**
   *
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @returns
   */
  async delete(request, response) {
    const { id } = request.params;

    const apagou = await questionariosServices.delete(id);
    if (!apagou) {
      return response.status(400).json({ message: "não foi possível apagar!" });
    }

    return response.status(204).end();
  }
}

module.exports = QuestionariosController;
