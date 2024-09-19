const { v4: uuid } = require("uuid");
const usuarioModel = require("../../database/models/usuarios");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwtSecret = "e1ba46759dc1501e9b4cf684df08fa17eabc955d";

class SessionServices {
  async create(email, senha) {
    const usuario = await usuarioModel.findOne({
      where: {
        email, //short syntax
      },
    });
    if (!usuario) {
      return null; //response.status(400).json({ message: "usuário não encontrado!" });
    }
    const senhaCrypto = await compare(senha, usuario.senha);

    if (!senhaCrypto) return null;
    const token = sign({ permissao: "criador" }, jwtSecret, {//process.env.JWT_SECRET
      subject: usuario.id,
      expiresIn: "1d",
    });

    return { usuario, token };
  }
}

module.exports = SessionServices;
