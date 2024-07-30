import { createServer } from 'node:http'
import { router } from '../'
import { routes } from './routes'

const port = Number(process.env.PORT || 3000)
const host = String(process.env.HOST || `0.0.0.0`)

createServer(router({ ...routes }))
  .listen(port, host, () => console.log(
    `🚀 Server is running! (${JSON.stringify({ NODE_ENV: process.env.NODE_ENV })}) | Listening on http://${host}:${port}. | To stop the server, press CTRL+C`
  ))