# TypeScript Quickstart
A simple guide to get started with TypeScript. This article assumes you have NodeJS and NPM installed. If you don't, visit https://nodejs.org/en/download/ to download them.

This article assumes that both the node and npm executables exist in your PATH environment variable. This article also assumes that `tsc` is not installed globally. All commands are written for bash on Linux and won't (probably) work on Windows.

Please note that this is how I set up my environments when I start a new project and it probably isn't industry standard or anything.

Alternatively, you can just clone this repository and install the required packages:

```bash
git clone https://github.com/jpsheehan/typescript-quickstart.git
npm install -D
```

## Setting up the environment
Create a new folder where you want your project to live. Open up the terminal in this folder and type the following commands:

```bash
npm init -y
npm i typescript
node ./node_modules/typescript/bin/tsc --init
```

This creates a default `package.json` file, installs the TypeScript compiler and creates a default `tsconfig.json`.

If you are using Visual Studio Code as an editor, you'll probably also want to install the `tslint` package to aid your development (NOTE: The `-D` flag indicates that we want to install this package as a development dependency and not as a production dependency which is the default). You won't need to do this if you have `tslint` installed globally, of course.
```bash
npm i -D tslint
```
## Configuring the TypeScript compiler and NPM

Make `src` and `bin` directories for our TypeScript and JavaScript files respectively:

```bash
mkdir bin
mkdir src
```

Let's create a simple example file in the `src` folder called `example.ts`:

```typescript
console.log("Working!");
```

Now edit the `tsconfig.json` file, changing the following lines as follows:

```json
{
    ...
    "outDir": "./bin/",
    "rootDir": "./src/",
    ...
}
```

This will set the default input file directory and output file directory to the ones we have just created.

Next configure some NPM by editing `package.json`:

```json
{
    ...
    "scripts": {
        "build": "tsc",
        "example": "node ./bin/example.js"
    },
    ...
}
```

This allows you to run the following command to build your project:

```bash
npm run build
```

You should now inspect the `bin` folder and you will find a file named `example.js`. This is the compiled JavaScript file that the TypeScript compiler has produced. To run this file, type the following command:

```bash
npm run example
```

Optionally, if you would prefer the TypeScript compiler to run in the background run this command:

```bash
npm run build -- --watch
```

This lets the TypeScript compiler only compile source files when they are changed.

At this point you will have a basic TypeScript project setup. Read on to learn about types.

## Types

In order for the TypeScript compiler make assumptions about the types of objects in your code, you will need some type definitions. Type definitions packages exist for pretty much every project.

For example, say you want to work with the default node libraries, you will get an error when compiling the following code:

```typescript
import os from "os"

console.log(`You are running a ${os.arch()} architecture!`);
```

For this to compile, the TypeScript compiler must have the type definition files for the Node API. Running the following command will install them:

```bash
npm i -D @types/node
```

The same is true for pretty much every other library available on NPM. For example, if you want the type definitions for `express`, run:

```bash
npm i -D @types/express
```

## Source Maps

Debugging can be a pain sometimes, moreso if you don't know the exact line where the error occurs. Because TypeScript transpiles to JavaScript, Node will only report the line that caused the issue in the JavaScript file. This is not desirable as the line in which the error occurs in TypeScript will most certainly be different.

To fix this problem TypeScript has the concept of source maps. To enable source maps, edit the `tsconfig.json` file:

```json
{
    ...
    "sourceMaps": true,
    ...
}
```

Then install the `node-source-map-support` package:

```bash
npm i source-map-support
```

And finally, add this to the start of your TypeScript file:

```typescript
import "source-map-support/register"
```

Now your errors will be expressed in terms of your source TypeScript files.

Note that you'll only need to call this once in your program. If you need more information on source maps, visit the project page: https://github.com/evanw/node-source-map-support

## Summary

Now you have a simple environment where you can compile TypeScript files, run the resulting JavaScript output, install type definitions for third party modules and debug your programs using source maps. I hope this helps you out.

🍍🍕🍍🍕🍍