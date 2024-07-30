# wroute
> HTTP servers with **typed** routing in `0(1)` time.

## features

- responds with `404` status when requesting a missing **endpoint**
- responds with `405` status when requesting a missing **method**

## install
```shell
pnpm add wroute
```

## :rocket: create a `server.ts`
```js
import { router } from 'wroute'
import { IncomingMessage as Request, ServerResponse as Response } from 'node:http'

const port = Number(process.env.PORT || 3000)
const host = String(process.env.HOST || `0.0.0.0`)

const server = createServer(
  router({
    '/': {
      GET: async (req: Request, res: Response) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ content: 'Hello World!' }))
      },
    },
  })
)

server.listen(port, host, () => console.log(
  `🚀 Server is running! | Listening on http://${host}:${port}. | To stop the server, press CTRL+C`
))
```

## :running: run the server
```
» node --watch --env-file=.env -r ts-node/register server
🚀 Server is running! | Listening on http://0.0.0.0:3000. | To stop the server, press CTRL+C
```

## :link: send a request
```
» curl -s 'http://0.0.0.0:3000' | yq .content
Hello World!
```

## Licenses

[![LICENSE](http://img.shields.io/npm/l/wroute.svg)](license)