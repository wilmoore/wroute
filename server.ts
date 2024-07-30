import { createServer } from 'node:http'

const PORT = Number(process.env.PORT || 3000)
const HOST = String(process.env.HOST || `127.0.0.1`)

const server = createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World!\n')
})

server.listen(PORT, HOST, () => console.log(
  `🚀 Server is running! | Listening on http://${HOST}:${PORT}. | To stop the server, press CTRL+C`
))