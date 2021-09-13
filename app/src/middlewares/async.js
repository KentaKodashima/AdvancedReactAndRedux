/**
 * Middleware boilerplate for Redux
 * 
 * @param { Function } dispatch - takes an action and kicks off the entire proccess of middlewares and reducers adn return an action with them
 * export default function({ dispatch }) {
 *   @param { Function } next - The reference to the next middleware in the chain. If it is the last middleware, it has the reference to the reducer.
 *   return function (next) {
 *     @param { { type: string, payload: Object } } action - Actual action that the action creator returns
 *     return function (action) {}
 *   }
 * }
 * */

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    debugger
    // Check to see if the action has a promise on its 'payload' property
    // If it does, then wait for it to resolve
    // If it doesn't, then send the action on to the next middleware
    if (!action.payload || !action.payload.then) {
      return next(action)
    }

    // Wait for the promise to resolve and then create a new action with that data and dispatch it
    action.payload.then((response) => {
      const newAction = { ...action, payload: response }
      dispatch(newAction)
    })
  }