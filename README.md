# Template NodeJS APIs
- This repo for define template for reuse any Project APIs in NodeJS or GraphQL
- This Template using [NestJS Framework](https://nestjs.com/) for development and can make issues at [HERE](https://github.com/longthemartec/template-nodejs-api/issues)
- [Discord Channel](https://discord.gg/nestjs) of NestJS Framework for more discussion.

## Configuration
1. Create a `.env` file from `.env.sample` and update value before start.
2. Edit env config
   - Edit the file in the `src/config` folder.
   - Update value for each `ENVIRONMENT` at `src/config/envs/{ENV_NAME}.ts`, example: `default / development / production / test`
3. Activating and configuring ESLint
> Setup on WebStorm
- In the `Settings/Preferences` dialog `(Ctrl+Alt+S)`, go to `Languages and Frameworks | JavaScript | Code Quality Tools | ESLint`.
- Select the `Manual ESLint configuration` option to use a custom ESLint package and configuration.
- In the `Node Interpreter` field, specify the path to Node.js. If you followed the standard installation procedure, `WebStorm` detects the path and fills in the field itself.
- In the `ESLint Package` field, specify the location of the eslint or standard package. `{project_path}/node_modules/eslint`
- In the `Configuration file` field, select this option to use a custom file and specify the file location in the Path field. `{project_path}/.eslintrc`
- Click `Apply > OK`
> Setup on VS Code
- Configure [Visual Studio Code](https://code.visualstudio.com/)
- Please install the 3 extensions below into VS Code:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension
  - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) extension
  - Restart VS Code


## Installation
- This use for setup
- If you use multiple databases then need change some in `bin/entity.js at Line 52`
```sh
# 1. node_modules - just for NPM
npm ci && npm i
# or
yarn install 
# 2. When import entities from an existing database
npm run entity
# or
yarn run entity
```

## Environments
### Development
- Start browser at `http://localhost:{port_in_env_file}` after run command under.
```sh
npm run dev
```
### Test 
- For run test with unittest, e2e in codebase
```sh
npm test # exclude e2e
npm run e2e
```
### Production
- Use only for production env
```sh
npm run build
# define environment variable yourself.
# NODE_ENV=production PORT=8000 NO_COLOR=true node dist/app
node dist/app
# or
npm start
# or
yarn start
```

## Folders
```js
+-- bin // Custom tasks
+-- dist // Source build
+-- public // Static Files
+-- src
|   +-- config // Environment Configuration
|   +-- entities // TypeORM Entities generated by `typeorm-model-generator` module
|   +-- modules // Store all module source here each sub-folder is one module and it's includes all files in this
|   |   +-- auth // Authentication module
|   +-- common // Global Nest Module
|   |   +-- base // base class for project
|   |   +-- constants // Constant value and Enum
|   |   +-- controllers // Nest Controllers
|   |   +-- decorators // Nest Decorators
|   |   +-- dto // DTO (Data Transfer Object) Schema, Validation
|   |   +-- filters // Nest Filters
|   |   +-- guards // Nest Guards
|   |   +-- loggers // All logger folder
|   |   +-- interceptors // Nest Interceptors
|   |   +-- interfaces // TypeScript Interfaces
|   |   +-- middleware // Nest Middleware
|   |   +-- pipes // Nest Pipes
|   |   +-- providers // Nest Providers
|   |   +-- models // Global models
|   |   +-- services // Global services
|   |   +-- * // repositories...
|   +-- shared // Shared Nest Modules
|   +-- debug // custom debug
|   +-- gql // GraphQL Structure
|   +-- * // Other Nest Modules, non-global, same as common structure above
+-- tests // Jest testing
+-- typings // Modules and global type definitions

// Module structure
// Add folders according to module scale. If it's small, you don't need to add folders.
+-- src/modules/greeter
|   +-- * // folders
|   +-- greeter.constant.ts // all constant for this module
|   +-- greeter.controller.ts // controller file for this module
|   +-- greeter.service.ts // service file for handle business logic and communicate with model for response data to controller
|   +-- greeter.module.ts // sub-module file to setup module for NestJS
|   +-- greeter.*.ts
|   +-- index.ts
```

## Implements
- See [Bootstrap](src/app.ts) & [App Module](src/app.module.ts)
   - Database, Module Router, Static Files, Validation
- [Global Exception Filter](src/common/filters/exceptions.filter.ts)
- [Global Logging Middleware](src/common/middleware/logger.middleware.ts)
- [Custom Logger](src/common/loggers) for Production
- [Custom Decorators](src/debug) Example at Nest level
- [Configuration](src/config)
- [Authentication](src/modules/auth) - JWT and Session login with Passport
- [Role-based Guard](src/common/guards/roles.guard.ts)
- Controller Routes
   - [Auth Login](src/base/controllers/auth.controller.ts)
   - [Sample](src/modules/sample/controllers/sample.controller.ts) Parameter and [DTO](src/sample/dto/sample.dto.ts)
   - [CRUD API](src/modules/sample/controllers/crud.controller.ts) Sample
- [Database Query](src/modules/sample/providers/database.service.ts) Example
- [Unit Test](src/modules/sample/providers/crud.service.spec.ts)
- [E2E Test](tests/e2e)
- [Shared Modules](src/shared) Example
- [GraphQL Structure](src/gql) Example

## Documentation
```sh
# APP, Compodoc
npm run doc #> http://localhost:8080
# API, Swagger - src/swagger.ts
npm run api #> http://localhost:8000/api
```

## Rules And References
- Some rules for write code in this template

### TypeScript Docs Refers
- [Typescript ESLint](https://typescript-eslint.io)
- [TypeScript From Scratch](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Variables Naming
- [Naming Cheatsheet](./naming.md)

### Linter
> It is recommended to apply the known extended presets in addition to the basic rules
- [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript)
- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) with TypeScript support
- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
> **Conventional Commits**: For consistent commit message
- [Conventional Commits](https://www.conventionalcommits.org)
- [Commit Lint](https://commitlint.js.org)
> **Semantic Versioning**: For automatic versioning and changelog based on consistent commit messages
- [Standard Version](https://github.com/conventional-changelog/standard-version)
- If you publish the project as a package, use [semantic-release](https://github.com/semantic-release/semantic-release).

### Index Exporting
```diff
# It's recommended to place index.ts in each folder and export.
# Unless it's a special case, it's import from a folder instead of directly from a file.
- import { FooController } from './controllers/foo.controller';
- import { BarController } from './controllers/bar.controller';
+ import { FooController, BarController } from './controllers';
# My preferred method is to place only one fileOrFolder name at the end of the path.
- import { UtilService } from '../common/providers/util.service';
+ import { UtilService } from '../common';
```

### Circular Dependency
- [Circular Dependency](https://docs.nestjs.com/fundamentals/circular-dependency)
```diff
# Do not use a path that ends with a dot.
- import { FooService } from '.';
- import { BarService } from '..';
+ import { FooService } from './foo.service';
+ import { BarService } from '../providers';
```

### Links
- [Nest Sample](https://github.com/nestjs/nest/tree/master/sample)
- [Awesome Nest](https://github.com/juliandavidmr/awesome-nestjs)
- [NestJS](https://docs.nestjs.com)
- [Type ORM](https://typeorm.io)
- [Mikro ORM](https://mikro-orm.io/)
