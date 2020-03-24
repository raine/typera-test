import * as t from 'io-ts'
import { Parser, Response, Route, route } from 'typera-express'

// works
const test1: Route<
  Response.Ok<string> |
  Response.BadRequest<string>
> = route('get', '/test')(Parser.query(t.any))((_req) => {
  return Response.ok('OK')
})

// works
const test2: Route<
  Response.Ok<'OK'> |
  Response.BadRequest<string>
> = route('get', '/test')(Parser.query(t.any))((_req) => {
  return Response.ok('OK')
})


// index.ts:24:7 - error TS2322: Type 'Route<ExpressContext, Response<400, string, undefined> | Response<200, string, undefined>>' is not assignable to type 'Route<ExpressContext, Response<400, string, undefined> | Response<200, "OK", undefined>>'.
//   Type 'Response<400, string, undefined> | Response<200, string, undefined>' is not assignable to type 'Response<400, string, undefined> | Response<200, "OK", undefined>'.
//     Type 'Response<200, string, undefined>' is not assignable to type 'Response<400, string, undefined> | Response<200, "OK", undefined>'.
//       Type 'Response<200, string, undefined>' is not assignable to type 'Response<400, string, undefined>'.
//         Type '200' is not assignable to type '400'.
const test3: Route<
  Response.Ok<'OK'> |
  Response.BadRequest<string>
> = route('get', '/test')(Parser.query(t.any))(async (_req) => {
                                            // ^--- add/remove async
  return Response.ok('OK')
})

// works
const test4: Route<
  Response.Ok<string> |
  Response.BadRequest<string>
> = route('get', '/test')(Parser.query(t.any))(async (_req) => {
  return Response.ok('OK')
})
