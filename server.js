const http = require("node:http");

const port = 3333
const hostname = 'localhost'

const server = http.createServer((request, response) => {
  const { method, url } = request;

  response.setHeader("Content-type", "application/son");
  if (method === "GET" && url === "/fundamentos") {
    response.end(JSON.stringify("Hello World! Fundamentos nodejs aplicado."));
  }
  return response.end('Hello World sem êxito!')
});

server.listen(port, hostname,()=>{
    console.log(`servidor rodando na porta ${port}: http://${hostname}:${port}`)
})
