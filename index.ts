import * as t from 'io-ts'
import { Parser, Response, Route, route, URL } from 'typera-express'

const test: Route<
  Response.Ok | Response.NotFound | Response.BadRequest<string>
> = route('get', '/test/', URL.str('id'))(Parser.query(t.any))((req) => {
  return req.routeParams.id !== 'foo'
    ? Response.notFound()
    : Promise.resolve().then(() => Response.ok())
})
