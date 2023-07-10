# Full Stack Budgeting App Frontend

This is the <mark>Frontend</mark> of the Full Stack Budgeting App that allows the user to interact with the backend. This application has full CRUD methods with use of these routes:

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
