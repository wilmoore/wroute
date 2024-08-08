import { RouteParameters } from '../../types'

export const search = {
  GET: async ({ res, _ }: RouteParameters) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      content: _
    }))
  }
}
