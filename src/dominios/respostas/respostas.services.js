const { v4: uuid } = require("uuid");
const { Respostas } = require("../../database/models/respostas");


class RespostasServices {

  async create(conteudo, perguntaId, usuarioId) {//(questionarioDTO) e perguntas como adição posterior
    const respostas = await Respostas.create(
      {
        conteudo,
        perguntaId,
        usuarioId,
      }
    );
    return respostas;
  }
  update() {}
  async delete(id) {
    const respostaExistente = await Respostas.findByPk(id);

    if (!respostaExistente) {
      return false;
    }
    await respostaExistente.destroy();
    return true;
  }
}

module.exports = RespostasServices;
