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

---

<br/>

# Wristband NestJS Multi-Tenant Demo App

This is a multi-tenant demo app that serves other companies as its customers. This repo utilizes the Backend Server integration pattern. The backend server is NestJS, and it hosts and serves up a Vue single-page application to the browser upon request.

This repo demonstrates the following:

- How to set up Auth Endpoints (login, callback, logout, session, token) using NestJS controllers
- How to create and manage encrypted cookie-based sessions with the Wristband Session Module
- How to protect API routes using NestJS guards with the `@UseGuards()` decorator
- How to apply authentication at both route-level and controller-level
- How to use session-based authentication (SESSION strategy) for browser clients
- How to integrate with a Vue.js frontend using Wristband's session and token endpoints

<br>

---

<br>

## Getting Started

You can start up the the demo application in a few simple steps.

### 1) Sign up for an Wristband account.

Make sure you sign up for an Wristband account at [https://wristband.dev](https://wristband.dev).

### 2) Provision the NestJS demo application in the Wristband Dashboard.

After your Wristband account is set up, log in to the Wristband dashboard.  Once you land on the home page of the dashboard, click the "Add Application" button.  Make sure you choose the following options:

- Step 1: Try a Demo
- Step 2: Subject to Authenticate - Humans
- Step 3: Application Framework - NestJS

You can also follow the [Demo App Guide](https://docs.wristband.dev/docs/setting-up-a-demo-app) for more information.

### 3) Apply your Wristband configuration values to the NodeJS server configuration

After completing demo app creation, you will be prompted with values that you should use to create environment variables for the NestJS server. You should see:

- `APPLICATION_VANITY_DOMAIN`
- `CLIENT_ID`
- `CLIENT_SECRET`

Copy those values, then create an environment variable file on the server at: `backend/.env`. Once created, paste the copied values into this file.

### 4) Install dependencies

> [!WARNING]
> Make sure you are in the root directory of this repository.

Before attempting to run the application, you'll need to setup the project. From the root directory of this repo, run the following:

```bash
npm run setup
```

This command will do the following:
- Clean old build artifacts
- Install all dependencies for both Vue and NestJS
- Build the Vue asset bundle that will be served up by NestJS (asset bundle target location is `backend/static/`)

### 5) Run the application in "production" mode

Start up the NestJS server in "production" mode. This lets NestJS serve the Vue static assets bundle, and it runs on port `6001`.

```bash
npm start
```

<br>

---

<br>

## How to interact with the demo app

### Home Page

For reference, the home page of this app can be accessed at [http://localhost:6001](http://localhost:6001).

### Signup Users

Now that the demo app is up and running, you can sign up your first customer on the Signup Page at the following location:

- `https://{application_vanity_domain}/signup`, where `{application_vanity_domain}` should be replaced with the value of the "Application Vanity Domain" value of the application (can be found in the Wristband Dashboard by clicking the Application Settings side menu of this app).

This signup page is hosted by Wristband.  Completing the signup form will provision both a new tenant with the specified tenant domain name and a new user that is assigned to that tenant.

### Application-level Login (Tenant Discovery)

Users of this app can access the Application-level Login Page at the following location:

- `https://{application_vanity_domain}/login`, where `{application_vanity_domain}` should be replaced with the value of the "Application Vanity Domain" value of the application (can be found in the Wristband Dashboard by clicking the Application Settings side menu of this app).

This login page is hosted by Wristband.  Here, the user will be prompted to enter their tenant's domain name for which they want to log in to.  Successfully entering the tenant domain name will redirect the user to the tenant-level login page for their specific tenant.

Users also have the option here to execute the Forgot Tenant workflow and entering their email address in order to receive a list of all tenants that they belong to.

### Tenant-level Login

If users wish to directly access their Tenant-level Login Page without having to go through tenant discovery, they can do so at [http://localhost:6001/api/auth/login?tenant_domain={tenant_domain}](http://localhost:6001/home), where `{tenant_domain}` should be replaced with the value of the desired tenant's domain name.

This login page is hosted by Wristband.  Here, the user will be prompted to enter their credentials in order to login to the application.

<br>

---

<br>

## Wristband Code Touchpoints

Within the demo app code base, you can search in your IDE of choice for the text `WRISTBAND_TOUCHPOINT`.  This will show the various places in both the Vue frontend code and NodeJS backend code where Wristband is involved.

<br>

## Run the application in "dev" mode to experiment with the code and debug

You can run this demo application in "dev" mode in order to actively debug or experiment with any of the code.  After installing all dependencies, run the following from the root directory of this repo:

```bash
npm run dev
```

The Vite dev server will start on port `6001`. The NestJS server will start on port `3001`. All URL locations should remain the same as when using the app in "production" mode.

<br>

## Wristband NestJS Auth SDK

This demo app is leveraging the [Wristband nestjs-auth SDK](https://github.com/wristband-dev/nestjs-auth) for all authentication interaction in the NestJS server. Refer to that GitHub repository for more information.

<br>

## Questions

Reach out to the Wristband team at <support@wristband.dev> for any questions regarding this demo app.

<br/>
