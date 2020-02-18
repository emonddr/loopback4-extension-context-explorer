# loopbacknext-context-binding-explorer
Prototype for a Graphical UI that shows request/server/application context bindings.
If the binding is associated with a class and this class injects other bindings, these bindings are show.

# Install loopback4-example-inspect

https://github.com/raymondfeng/loopback4-example-inspect

This runs on port : 3000  .


## Startup Instructions
- npm install
- npm start


# BindingInfo Application 

- React.js application

- Runs on http://localhost:3001
  ( See .env file to change the port number)


- Displays context binding and injection info

- Still a prototype.

## Startup Instructions
- npm install
- npm start


- Expand the contexts on the left
- Click on a binding
- Details appear on the right in **Details** tab
- If binding is associated with a Class, a second tab **Injections** will show any bindings that this class injects into its constructor. ( Unsure so far if **https://github.com/raymondfeng/loopback4-example-inspect** will be able to collect class injections that do not appear in constructor, but in member fields or method signatures)



