const { v4: uuid } = require("uuid");
const usuarioModel = require('../../database/models/usuarios');
const { hash } = require("bcrypt");
// const usuarios = [
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

class UsuariosServices {
  async list() {
    const usuarios = await usuarioModel.findAll({
      attributes:['id', 'nome', 'sobrenome', 'email', 'permissoes', 'createdAt', 'updatedAt']
    })
    return usuarios;
  }

  async createUser(email, nome, sobrenome, senha) { //(usuarioDTO)
    const usuarioExistente = await usuarioModel.findOne({ //find((usuario) => usuario.email === usuarioDTO.email
      where: {
        email,//email: usuarioDTO.email,
      }
    }) 
    if (usuarioExistente) {
      //throw new Error('erro no servidor!')
      return null; //response.status(400).json({ message: "usuário já cadastrado!" });
    }
    const senhaCrypto =  await hash(senha, 8)

const usuario = await usuarioModel.create({
  nome, email, sobrenome, senha: senhaCrypto, permissoes
})
    // const novoUsuario = {
    //   id: uuid(),
    //   nome: usuarioDTO.nome,
    //   sobrenome: usuarioDTO.sobrenome,
    //   email: usuarioDTO.email,
    //   createdAt: new Date().toLocaleDateString(),
    // };

    // usuarios.push(novoUsuario);
    return usuario;
  }
  update() {}
  async delete(id) {
    const usuarioExistente = await usuarioModel.findByPk(id)//usuarios.find((usuario) => usuario.id === id);

    if (!usuarioExistente) {
      return false;
    }
    await usuarioExistente.destroy()
    return true;
  }
}

module.exports = UsuariosServices;
