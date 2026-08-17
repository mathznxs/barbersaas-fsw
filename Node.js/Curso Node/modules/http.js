const http = require("http");
const port = 8080;

const server = http.createServer((req, res) => {
    if (req.url === "/home") {
        res.writeHead(200, {"content-type": "text/html"})
        res.end("<h1>Hello World!</h1>")
    }
    if (req.url === "/users") {
        const users = [
            {
                name: "John Doe",
                email: "john@doe"
            },
            {
                name: "Jane Doe",
                email: "jane@doe"
            }
        ]
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(users)) 
    }
})

server.listen(port, () => console.log(`Rodando na porta ${port}`))