const jwtSecret = "e1ba46759dc1501e9b4cf684df08fa17eabc955d";
/**
 *
 * @param {import('express').Request;} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */

function garantirAutenticacao(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) throw new Error("JWT TOKEN  não encontrado!");

  const [, token] = authorization.split(" ");
  try {
    const decoded = verify(token, jwtSecret);

    const { sub, permissao } = decoded;
    console.log({ sub, permissao });
    request.usuario = { id: sub, permissao };
  } catch (error) {
    throw new Error("erro ao processar JWT TOKEN!");
  }
}

function garantirAutenticacaoRbac(permissaoPametro) { //permissaoParametro é definida nas ROTAS MANUALMENTE
  return (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) throw new Error("JWT TOKEN  não encontrado!");

    const [, token] = authorization.split(" ");
    try {
      const decoded = verify(token, jwtSecret);

      const { sub, permissao } = decoded;
      if (permissao !== permissaoPametro)
        throw new Error("Usuário não possui permissão!");
      console.log({ sub, permissao });
      request.usuario = { id: sub, permissao };
    } catch (error) {
      throw new Error("erro ao processar JWT TOKEN!");
    }
  };
}
module.exports = { garantirAutenticacao, garantirAutenticacaoRbac };
