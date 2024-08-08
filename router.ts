import { Method, Wroutes } from './types'
import {
  IncomingMessage as Request,
  ServerResponse as Response,
} from 'node:http'

export const router = (routes: Wroutes): (req: Request, res: Response) => void => {
  const routePattern = (templateString: string) => RegExp(`^${templateString.replace(/{(?<parameterName>[0-9a-zA-Z]+)}/g, '(?<$<parameterName>>[0-9a-zA-Z]+)')}$`)
  const routeMatcher = (templateString: string) => (endpoint: string) => {
    const [ routeKey ] = templateString.replace('{?', '?{').split('?')
    return routePattern(routeKey).test(endpoint)
  }

  return (req: Request, res: Response): void => {
    const { method, url } = req;
    const [ endpoint, querystring ] = (url?.replace('{?', '?{').split('?') ?? ["", ""])
    const [ routeKey ] = <[string]>Object.keys(routes).filter((uriTemplate) => {
      const [ routeKey ] = uriTemplate.replace('{?', '?{').split('?')
      return routeMatcher(routeKey)(endpoint as string)
    })

    const qs = new URLSearchParams(querystring)
    console.debug({ method, url, routeKey, endpoint, querystring, qs })

    if (routeKey) {
      const route = routes[routeKey]
      const routeHandler = route[method as Method]

      if (routeHandler) {
        routeHandler({
          req,
          res,
          _: {
            uri: ((endpoint).match(routePattern(routeKey))?.groups || {}),
            qry: Object.fromEntries(qs.entries())
          }
        })
      } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' })
        res.end('Method Not Allowed')
      }
    } else {
      console.log('404', url)
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not Found')
    }
  }
}
