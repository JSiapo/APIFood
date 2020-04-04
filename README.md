API to obtain food and menu for days, which will be used in different client applications.

## Requirements

- A database (support by [typeorm](https://typeorm.io/))

  - Mysql
  - SQLite
  - Postgres
  - SQL Server
  - SQL.js
  - Oracle Database
  - MongoDB (**experimental**)

## How to use

Change the database configuration in `config.ts` or your variables.

### Run in local

Install dependences and run in **local**.

```bash
npm i
npm run dev
```

### Build

Build with

```bash
npm run build
```

_This command create the `dist` folder_

---

**Warning**

I use a free [host](https://apihomefood.herokuapp.com/), please if you going to use this project, deploy on your host, because you could pass the limit.
