import { call } from 'redux-saga/effects'

export default function* sagaAPICall (fn, args = {}, settings) {
  if (args !== {}) delete args.type
  const response = yield call(fn, args)
  yield * handlingResponse(response, settings)
}

export function * handlingResponse (response, settings) {
  const { completed, success, failed } = settings
  if (completed) yield * completed(response)
  if (response !== undefined && response.ok &&
      response.data.error_code === undefined) {
    if (success) yield * success(response.data)
  } else {
    if (failed) yield * failed(response)
  }
}
