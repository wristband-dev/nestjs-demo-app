<div align="center">
  <a href="https://wristband.dev">
    <picture>
      <img src="https://assets.wristband.dev/images/email_branding_logo_v1.png" alt="Github" width="297" height="64">
    </picture>
  </a>
  <p align="center">
    Enterprise-ready auth that is secure by default, truly multi-tenant, and ungated for small businesses.
  </p>
  <p align="center">
    <b>
      <a href="https://wristband.dev">Website</a> •
      <a href="https://docs.wristband.dev">Documentation</a>
    </b>
  </p>
</div>

<br/>

# Wristband NestJS Multi-Tenant Demo App

This is a multi-tenant demo app that serves other companies as its customers. This repo utilizes a "Backend Server" OAuth2 client type. The backend server technology here is the NestJS Framework. NestJS hosts and serves up a Vue single-page application to the browser upon request.

<br>
<hr />
<br>

## Getting Started

You can start up the the demo application in a few simple steps.

### 1) Sign up for an Wristband account.

First thing is first: make sure you sign up for an Wristband account at [https://wristband.dev](https://wristband.dev).

### 2) Provision the NestJS demo application in the Wristband Dashboard.

After your Wristband account is set up, log in to the Wristband dashboard.  Once you land on the home page of the dashboard, click the button labeled "Add Demo App".  Make sure you choose the following options:

- Step 1: Subject to Authenticate - Humans
- Step 2: Client Framework - NestJS

You can also follow the [Demo App Guide](https://docs.wristband.dev/docs/setting-up-a-demo-app) for more information.

### 3) Apply your Wristband configuration values to the NodeJS server configuration

After completing demo app creation, you will be prompted with values that you should use to create environment variables for the Express server. You should see:

- `APPLICATION_DOMAIN`
- `CLIENT_ID`
- `CLIENT_SECRET`

Copy those values, then create an environment variable file on the server at: `nestjs-backend/.env`. Once created, paste the copied values into this file.

### 4) Install dependencies

Before attempting to run the application, you'll need to install all project dependencies for both Express and React. From the root directory of this repo, run the following to install dependencies:

```bash
npm run install-all
```

### 5) Run the application

> [!WARNING]
> Make sure you are in the root directory of this repository.

#### Build the client application bundle

Build the Vue asset bundle that will be served up by NestJS (asset bundle target location is `server/dist/`):

```bash
npm run build
```

#### Run the NestJS server

Start up the NestJS server in "production" mode. This lets NestJS serve the Vue bundle as static content from the NestJS server.  The NestJS server runs on port `6001`.

```bash
npm start
```

<br>
<hr>
<br>

## How to interact with Invotastic for Business

### Signup Invotastic Users

Now that Invotastic for Business is up and running, you can sign up your first customer on the Invotastic for Business Signup Page at the following location:

- `https://{application_vanity_domain}/signup`, where `{application_vanity_domain}` should be replaced with the value of the "Application Vanity Domain" value of the Invotastic for Business application (can be found in the Wristband Dashboard by clicking the Application Details side menu of this app).

This signup page is hosted by Wristband.  Completing the signup form will provision both a new tenant with the specified tenant domain name and a new user that is assigned to that tenant.

### Home Page

For reference, the home page of this Inovtastic for Business app can be accessed at [http://localhost:6001/home](http://localhost:6001/home).

### Application-level Login (Tenant Discovery)

Users of this app can access the Application-level Login Page at `https://{application_vanity_domain}/login`, where `{application_vanity_domain}` should be replaced with the value of the "Application Vanity Domain" (can be found in the Wristband Dashboard by clicking the Application Settings side menu of this app).

This login page is hosted by Wristband.  Here, the user will be prompted to enter their tenant's domain name for which they want to log in to.  Successfully entering the tenant domain name will redirect the user to the tenant-level login page for their specific tenant.

Users also have the option here to execute the Forgot Tenant workflow and entering their email address in order to receive a list of all tenants that they belong to.

### Tenant-level Login

If users wish to directly access the demo app Tenant-level Login Page without having to go through the application-level login, they can do so at [http://localhost:6001/api/auth/login?tenant_domain={tenant_domain}](http://localhost:6001/home), where `{tenant_domain}` should be replaced with the value of the desired tenant's domain name. This login page is hosted by Wristband.  Here, the user will be prompted to enter their credentials in order to login to the application.

<br>
<hr>
<br>

## Entity Model

The application has the Wristband identity provider enabled by default so that all users can login with an email and a password.  The application has one OAuth2 client through which users will be authenticated.  In this case, the client is a NestJS backend server.  Companies that signup with will be provisioned a tenant under the application. When a new user signs up their company, they are assigned the "Owner" role by default and have full access to their company resources.  Owners of a company can also invite new users into their company.  Invited users can be assigned either the "Owner" role or the "Viewer" role.

## Wristband Code Touchpoints

Within the demo app code base, you can search in your IDE of choice for the text `WRISTBAND_TOUCHPOINT`.  This will show the various places in both the React frontend code and NodeJS backend code where Wristband is involved.  You will find the search results return one of a few possible comments using that search text:

<br>
<hr />
<br/>

## Run the application in "dev" mode to experiment with the code and debug

You can run this demo application in "dev" mode in order to actively debug or experiment with any of the code.  This will require starting up the React client application in a separate CLI from the NodeJS server.  All API calls made from React to NodeJS are configured to be proxied in order to avoid CORS issues.

In one CLI, change to the `client` directory and run the following to start the Vite dev server (runs on port `6001`):

```bash
npm start
```

In a second separate CLI, change to the `server` directory and run the following to start the NodeJS server in "dev" mode (runs on port `3001`):

```bash
npm run dev
```

All URL locations should remain the same as when using the app in "production" mode.

<br>
<hr />
<br/>

## Wristband Express Auth SDK

This demo app is leveraging the [Wristband nestjs-auth SDK](https://github.com/wristband-dev/nestjs-auth) for all authentication interaction in the NestJS server. Refer to that GitHub repository for more information.

<br>

## CSRF Protection

Cross-Site Request Forgery (CSRF) is a security vulnerability where attackers exploit a user's authenticated session to perform unauthorized actions on a web application without their knowledge or consent. This demo app is leveraging a technique called the Double Cookie Submit Pattern to mitigate CSRF attacks by employing two cookies: a session cookie for user authentication and a CSRF token cookie containing a unique token. With each request, the CSRF token is included both in the cookie and the request payload, enabling server-side validation to prevent CSRF attacks.

Refer to the [OWASP CSRF Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) for more information about this topic.

> [!WARNING]
> Your own application should take effort to mitigate CSRF attacks in addition to any Wristband authentication, and it is highly recommended to take a similar approach as this demo app to protect against thse types of attacks.

Within the demo app code base, you can search in your IDE of choice for the text `CSRF_TOUCHPOINT`.  This will show the various places in both the React frontend code and NodeJS backend code where CSRF is involved.

<br/>

## Questions

Reach out to the Wristband team at <support@wristband.dev> for any questions regarding this demo app.

<br/>
