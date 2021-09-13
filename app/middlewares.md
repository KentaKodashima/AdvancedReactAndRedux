# Middlewares

## What is a meddleware?
[Middleware | Redux](https://redux.js.org/understanding/history-and-design/middleware)

## The steps in the example app
1. Call fetchComments
2. Ajax request issued
3. Action returned from action creator
4. Response from JSON API received - Unclear when it's received
5. Action send to the reducer

## Custom middleware in the example app
1. Look at the incoming action, and see if it has network request or promise
2. (No) If it doesn't, let the action pass through and pass it to the next middleware
2. (Yes) If it does, make sure it doesn't res foward this promise on until the promise has been resolved
3. Wait for the promise to be resolved and foward the promise when it is resolved