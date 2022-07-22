# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone https://github.com/I-vasilich-I/nodejs2022Q2-service.git
```

## Installing NPM modules

```bash
npm install
```

## Running application in docker container

```bash
npm run docker
```

## Scan application docker container for vulnerabilities

```bash
npm run scan:app
```

## Scan database docker container for vulnerabilities

```bash
npm run scan:db
```


After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/doc/>.
For more information about OpenAPI/Swagger please visit <https://swagger.io/>.

## Testing

After application running open new terminal and enter:

To get all containers info:
`CONTAINER_ID, IMAGE, COMMAND, CREATED, STATUS, PORTS, NAMES`

```bash
docker container ls
```

To run command inside container

```bash
docker exec -it <CONTAINER_ID> <COMMAND>
# docker exec -it 3467852baa44 npm run test
```


To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: <https://code.visualstudio.com/docs/editor/debugging>
