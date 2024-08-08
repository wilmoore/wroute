import { Method, Wroutes } from './types'
import {
  IncomingMessage as Request,
  ServerResponse as Response,
} from 'node:http'

export const router = (routes: Wroutes): (req: Request, res: Response) => void => {
  const routePattern = (templateString: string) => RegExp(`^${templateString.replace(/{(?<parameterName>[0-9a-zA-Z]+)}/g, '(?<$<parameterName>>[0-9a-zA-Z]+)')}$`)
  const routeMatcher = (templateString: string) => (endpoint: string) => routePattern(templateString).test(endpoint)

  return (req: Request, res: Response): void => {
    const { method, url } = req;
    const [ pathname, querystring ] = (url?.split('?') ?? ["", ""])
    const [ routeKey ] = <[string]>Object.keys(routes).filter((uriTemplate) => routeMatcher(uriTemplate)(pathname as string))

    if (routeKey) {
      const route = routes[routeKey]
      const routeHandler = route[method as Method]

      if (routeHandler) {
        routeHandler({
          req,
          res,
          _: {
            uri: new Map(Object.entries((pathname).match(routePattern(routeKey))?.groups || {})),
            qry: new Map(Object.entries(new URLSearchParams(querystring)))
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
