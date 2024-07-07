# wiegaaterkoffiehalen.nl - frontend

This is the frontend of wiegaaterkoffiehalen.nl

> [!IMPORTANT]  
> This project is provided for demonstration purposes only. The source code is available for review to showcase the functionality and design of the application. However, redistribution, modification, or hosting of this project by any individual or organization other than the original author is strictly prohibited without explicit permission.
> By accessing or using this project, you agree to abide by the terms of this disclaimer and acknowledge that any unauthorized use of the project is not permitted.

## Installation

- Use the package manager [npm](https://www.npmjs.com/) to install all dependencies
- Create the [**.env**](#env-file) file in the root directory
- Create the [**cypress.env.json**](#cypress-file) file in the root directory
- Run `npm run dev` to start the Vite / React project

### env file

```
VITE_AVATAR_URL=https://app.wiegaaterkoffiehalen.nl/static/avatar/
VITE_VER=x.x.x
VITE_SENTRY_DSN=https://xxxxxx.ingest.sentry.io/123456789
VITE_SOCKET_URL=ws://localhost:3000
VITE_COGNITO_USERPOOL_ID=xxx
VITE_COGNITO_CLIENT_ID=xxx
VITE_ENVIRONMENT=dev
VITE_API_PATH=http://localhost:3000/api/v1
```

### cypress file

```
{
  "userxPassword": "",
  "user01Email": "",
  "user02Email": ""
}

```

## Testing

Testing is done with [Cypress](https://www.cypress.io/).

If all dependencies are installed, simply run `npx cypress open` from the CLI.

## Building

By running `npm run build`, the project will be build for production. The output will be places in the **dist** folder. By running `npm run preview` you can run the production-build locally.

## Contributing

Currently no pull requests are welcome since this is a private project and only open for demonstration purposes. For bugs and other issues, please open an issue. Thank you very much!

Please make sure to update tests as appropriate.
