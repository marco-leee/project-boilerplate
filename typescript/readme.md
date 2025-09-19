# Typescript Project boilerplates

1. Mainly for frontend and scripting projects
2. Two main frontend frameworks:
   1. React
   2. Svelte

# Packages

1. Each package is a separate project
2. To import from one package to another:
   - Add the dependency in `package.json`: `"@intellistixman/package-name": "workspace:*"`
   - Import normally: `import { something } from "@intellistixman/package-name"`
   - Bun automatically resolves workspace packages using the `workspace:*` protocol
