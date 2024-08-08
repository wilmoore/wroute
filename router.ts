import { Method, Wroutes } from './types'
import {
  IncomingMessage as Request,
  ServerResponse as Response,
} from 'node:http'

export const router = (routes: Wroutes): (req: Request, res: Response) => void => {
  const splitUrl = (url: string | undefined) => (url || "").replace('{?', '?{').split('?')
  const pathname = (url: string) => splitUrl(url)[0]
  const routePattern = (templateString: string) => RegExp(`^${templateString.replace(/{(?<parameterName>[0-9a-zA-Z]+)}/g, '(?<$<parameterName>>[0-9a-zA-Z]+)')}$`)
  const routeMatcher = (templateString: string) => (endpoint: string) => routePattern(pathname(templateString)).test(endpoint)

  return (req: Request, res: Response): void => {
    const { method, url } = req;
    const [ endpoint, querystring ] = splitUrl(url) ?? ["", ""]
    const [ routeKey ] = <[string]>Object.keys(routes).filter((uriTemplate) => routeMatcher(pathname(uriTemplate))(endpoint as string))

    if (routeKey) {
      const route = routes[routeKey]
      const routeHandler = route[method as Method]

      if (routeHandler) {
        routeHandler({
          req,
          res,
          _: {
            uri: ((endpoint).match(routePattern(routeKey))?.groups || {}),
            qry: Object.fromEntries((new URLSearchParams(querystring)).entries())
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
