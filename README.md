# MgM - Back-end

Back-end of a Member get Member application.</br>


## It's routes

<details>
<summary>GET /health</summary>
<summary>Returns status 200(OK)</summary>
</details>
<details>
<summary>POST /auth</summary>
<summary>Creates and returns account login token</summary>
-Input: email and password

```bash
  {
    email: string, //in email format
    password: string 
  }
```
-Output: status 200 OK and token
```bash
  "US6e8bd134-2318-4a78-b60d-7dd928ccae18"
```
</details>
<details>
<summary>POST /company/sign-up</summary>
<summary>Create company (Authorization: SuperUser)</summary>
-Input: name, email, password and contact

```bash
  {
    name: string,
    email: string, //in email format
    password: string,
    contact: string
  }
```
-Output: created company data
```bash
  {
    id: string,
    email: string,
    name: string,
    password: string, //hashed
    contact: string,
    token: string, //default null
    role: "COMPANY"
  }
```
</details>
<details>
<summary>POST /campaign/create</summary>
<summary>Create campaign (Authorization: SuperUser or Company)</summary>
-Input: participant id, game id, amount bet and both teams scores

```bash
  {
    name: string,
    desc: string,
    link: string, //url
    currency: string, //currency name, default "points"
    points: number, //amount given per recomendation
    prize: {
        name: string,
        cost: number,
                        //extra keys allowed
    }[];
    companyId?: string //only needed when logged in as SuperUser 
  }
```
-Output: created campaign information
```bash
  {
    id: string,
    name: string,
    desc: string,
    link: string,
    currency: string,
    points: number,
    prize: {
        name: string,
        cost: number,
                        //extra keys
    }[],
    companyId: string
  }
```
</details>
<details>
<summary>GET /campaign/name?name</summary>
<summary>Returns all campaigns with name</summary>
-Input: query params name

```bash
  host/campaign/name?name="example"
```
-Output: all campaigns with name containing example
```bash
  [{
    id: string,
    name: string,
    desc: string,
    link: string,
    currency: string,
    points: number,
    prize: {
        name: string,
        cost: number,
                        //extra keys
    }[],
    companyId: string
  }]
```
</details>
<details>
<summary>GET /buy/:id/:item</summary>
<summary>Uses user currency to buy item (Authorization: User)</summary>
-Input: campaign id and item index

```bash
    host/campaign/65f0fb34e6b6cc7308e914cb/0
```
-Output: item bought
  
```bash
  {
    name: string,
    amount: number,
                    //extra keys
  }
```
</details>
<details>
<summary>POST /user/sign-up</summary>
<summary>Creates user</summary>
-Input: name, email and password

```bash
  {
    name: string,
    email: string, //in email format
    password: string
  }
```
-Output: created user information
```bash
  {
    id: string,
    email: string,
    name: string,
    password: string, //hashed
    inventory: [{
        name: string,
        amount: number,
                        //extra keys
    }],
    currency: [{
        currency: string,
        points: number
    }],
    role: "USER",
    token: string	//default null
  }
```
</details>
<details>
<summary>GET /link/generate/:id</summary>
<summary>Generates link for campaign (Authorization: User)</summary>
-Input: campaign id

```bash
    host/link/generate/65f0fb34e6b6cc7308e914cb
```
-Output: recommendation link
```bash
  host/link/Dr5PKuER
```
</details>
<details>
<summary>GET /link/:short</summary>
<summary>Gives user who generated link its rewards and redirects to campaign's url</summary>
-Input: short generated by /link/generate/:id

```bash
    host/link/Dr5PKuER
```
-Output: redirect to url

</details>

## Technologies
- Node
- Express
- Axios
- Bcrypt
- Cors
- Dotenv
- Joi
- Nodemon
- UUID
- Jest
- Prisma
- Nanoid

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a Mongo database with whatever name you want (**MUST BE A REPLICA SET**)
4. Configure the `.env.development` file using the `.env.example` file
5. Generate prisma client

```bash
npm run dev:generate
```

6. Seed db

```bash
npm run dev:seed
```

7. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section
2. Configure the `.env.test` file using the `.env.example` file 
3. Generate prisma client

```bash
npm run test:generate
```

4. Seed db

```bash
npm run test:seed
```

5. Run test:

```bash
npm run test
```

## Building and starting for production

```bash
npm run build
npm start
```

## Generate prisma clients

Before running generate make sure you have a mongo db running based on `.env.development` or `.env.test` file for each environment.

You can operate on databases for different environments, but it is necessary to populate correct env variables for each environment first, so in order to perform db operations type the following commands:

- `npm run dev:generate` - generates prisma client for development environment by loading envs from .env.development file. It uses [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) to load envs from .env.development file.
- `npm run test:generate` - the same, but for test environment.

## What to do when add new ENV VARIABLES

There are several things you need to do when you add new ENV VARIABLES:
- Add them to `.env.example` file
- Add them to your local `.env.development` and `.env.test` files