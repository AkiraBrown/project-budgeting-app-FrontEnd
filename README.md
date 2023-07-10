# Full Stack Budgeting App Frontend

This is the <mark>Frontend</mark> of the Full Stack Budgeting App that allows the user to interact with the backend. This application has full CRUD methods with use of these routes:

## Dev Instructions

If running this locally, use <mark>npm start</mark> to start the frontend. However the backend has to be running locally as well in order to get the transaction data to appear. The frontend defaults to port 3000 and the backend defaults to port 3001.

Both must be running in order to get the full application experience.

To close the application use ctrl + c to close the port.

## Data Layout

```json
[
  {
    "id": "",
    "name": "",
    "amount": "",
    "date": "",
    "from": "",
    "category": ""
  }
]
```

# Links

- FrontEnd Repository: [Budgeting App Frontend](https://github.com/AkiraBrown/project-budgeting-app-FrontEnd)
- FrontEnd Deploy Site: [Budgeting App Frontend Deploy](https://budget-ab.netlify.app/)
- BackEnd Repository: [Budgeting App Backend](https://github.com/AkiraBrown/project-budgeting-app-BackEnd)
- BackEnd Deploy: [Budgeting App Backend Deploy](https://budget-app-back-end-czu9.onrender.com/transactions)

# Routes

`:id` refers to a dynamic parameter on the API call

| CRUD Description                 | Route                            | Method |
| -------------------------------- | -------------------------------- | ------ |
| Get All Transactions             | "/transactions"                  | GET    |
| Get individual transaction       | "/transactions/:id"              | GET    |
| Creaete a new transaction        | "/transactions/new-transactions" | POST   |
| Delete an individual transaction | "/delete-transactions/:id"       | DELETE |
| Update an individual transaction | "/update-transactions/:id"       | PUT    |

# Packages Used (BackEnd)

1. React
2. React-Router-Dom
3. Bootstrap
4. uuid
5. Axios
6. Chartjs (Deprecated)
