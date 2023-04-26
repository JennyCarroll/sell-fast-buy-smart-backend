# lhl-final

# SFBS - SELL FAST BUY SMART

### Main Contributors: [Jason Waldick](https://github.com/Jason-Wall), [Jenny Carroll](https://github.com/JennyCarroll), [Tyler Chessa](https://github.com/tylerchessa)

## Overview

A buy/sell application that allows users to bid on and post items for sale, with real time web socket notifications.

To view the dedicated Git repository for the frontend, please [click here](https://github.com/JennyCarroll/sell-fast-buy-smart-frontend).

This web app has been deployed on [Digital Ocean](https://starfish-app-bhxro.ondigitalocean.app/).

## Getting Started

The following steps are only required for local use.

1. Clone or fork this respository.
2. `npm install` to install dependencies.
3. Start postgreSQL and [create a new database](https://www.postgresql.org/docs/current/sql-createdatabase.html) with username and password.
4. rename the `.env.example` and update `DB_*` variables to reflect the recently created database.
5. Re-seed the database using: `npm run db:reset`.
6. `npm start` to start the server - Nodemon will document any network activity in the terminal.

### Back-End Dependencies:

This application was developed using Node 16.19.1

```js
"dependencies": {
    "chalk": "^2.4.2",
    "cors": "^2.8.5",
    "dotenv": "^2.0.0",
    "express": "^4.18.2",
    "morgan": "^1.10.0",
    "pg": "^8.10.0",
    "socket.io": "^4.6.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
```

## Contact the Contributors

Questions? comments? Feel free to contact any of the contributors of this app. Linkedin links below:

The wonderful [Jason Waldick](https://www.linkedin.com/in/jason-waldick/)

The amazing [Jenny Carroll](https://www.linkedin.com/in/jenny-carroll/)

The delightful [Tyler Chessa](https://www.linkedin.com/in/tyler-chessa/)
