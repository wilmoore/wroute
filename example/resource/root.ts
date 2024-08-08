import { RouteParameters } from '../../types'

export const GET = async ({ res }: RouteParameters) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ content: 'Hello World!' }))
}
