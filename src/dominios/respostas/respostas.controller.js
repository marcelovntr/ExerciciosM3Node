const RespostasServices = require("./respostas.services");

const respostasServices = new RespostasServices();

class RespostasController {

  /**
   *
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @returns
   */
  async create(request, response) {
    const { body } = request;
    const { perguntaId } = request.params
    const { id } = request.usuario

    const questionario = await respostasServices.create({
      ...body,
      perguntaId, //short syntax
      usuarioId: id
  });

    return response.json(questionario);
  }

}

module.exports = RespostasController;
