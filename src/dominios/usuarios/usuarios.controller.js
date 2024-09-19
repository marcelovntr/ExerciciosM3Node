const UsuarioService = require("./usuarios.services");

const usuariosServices = new UsuarioService();

class UsuariosController {

  /**
   * 
   * @param {import('express').Request} request 
   * @param {import('express').Response} response 
   * @returns 
   */
  async index(request, response) {
    const listaUsuarios = await usuariosServices.list();
    return response.json(listaUsuarios);
  }
 /**
   * 
   * @param {import('express').Request} request 
   * @param {import('express').Response} response 
   * @returns 
   */
  async create(request, response) {
    const { body } = request;

    const usuario = await usuariosServices.createUser(body);
    if(!usuario) return response.status(400).json({message: 'usuário já possui cadastro'})

    return response.json(usuario);
  }
 /**
   * 
   * @param {import('express').Request} request 
   * @param {import('express').Response} response 
   * @returns 
   */
  async delete(request, response) {
    const { id } = request.params;

    const apagou = await usuariosServices.delete(id)
    if(!apagou){
        return response.status(400).json({message: 'não foi possível apagar!'})
    }

    return response.status(204).end()
  }
}

module.exports = UsuariosController;
