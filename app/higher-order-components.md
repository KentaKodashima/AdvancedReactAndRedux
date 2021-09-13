# Higher order components

## What is higher order components
A higher order component is a React ccomponent that is made to help us reuse code. Basically, all it does is injecting an extra component with extra functionalities.

Difinition from the official docs:
> Concretely, a higher-order component is a function that takes a component and returns a new component. Whereas a component transforms props into UI, a higher-order component transforms a component into another component.

## Steps to create a higher order component
1. Write the logic you want to reuse into a component
2. Create a HOC file and add the HOC scaffold
3. Moved the reusable logic into the HOC
4. Pass props/config/behavior through to child component