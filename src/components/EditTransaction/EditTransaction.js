import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [transaction, setTransaction] = useState({
    name: "null",
    amount: 0,
    date: "null",
    from: "null",
    category: "null",
  });

  const [isWithdrawal, setIsWithdrawal] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let URL =
      process.env.NODE_ENV === "production"
        ? `https://budget-app-back-end-czu9.onrender.com/transactions/${id}`
        : `http://localhost:3001/transactions/${id}`;
    try {
      let result = await axios.get(URL);
      //console.log(result.data.data);
      result.data.data < 0 ? setIsWithdrawal(true) : setIsWithdrawal(false);
      setTransaction(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnChange(id, value) {
    //console.log(id, value);
    setTransaction({ ...transaction, [id]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3001/transactions/update-transactions/${id}`,
        transaction
      );
      alert(`Successfully Updated`);
      navigate(`/transactions/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  function amountOnChange(id, value) {
    if (isWithdrawal) {
      setTransaction({ ...transaction, [id]: 0 - Number(value) });
    } else {
      setTransaction({ ...transaction, [id]: Number(value) });
    }
  }

  return (
    <div className="container-md">
      <h1>Edit Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="withdrawalRadio"
            checked={isWithdrawal ? true : false}
            onChange={() => {
              setIsWithdrawal(!isWithdrawal);
            }}
          />
          <label className="form-check-label" htmlFor="withdrawalRadio">
            Withdrawal
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="depositRadio"
            checked={!isWithdrawal ? true : false}
            onChange={() => {
              setIsWithdrawal(!isWithdrawal);
            }}
          />
          <label className="form-check-label" htmlFor="depositRadio">
            Deposit
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="datetime-local"
            id={"date"}
            required
            className="form-control"
            value={transaction.date}
            onChange={(e) => {
              handleOnChange(e.target.id, e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            id={"name"}
            className="form-control"
            value={transaction.name}
            required
            onChange={(e) => {
              handleOnChange(e.target.id, e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            id={"amount"}
            className="form-control"
            required
            value={transaction.amount}
            onChange={(e) => {
              amountOnChange(e.target.id, e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">From</label>
          <input
            type="text"
            id={"from"}
            className="form-control"
            value={transaction.from}
            required
            onChange={(e) => {
              handleOnChange(e.target.id, e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            required
            value={transaction.category}
            onChange={(e) => {
              handleOnChange(e.target.id, e.target.value);
            }}
          >
            <option value={"none"}>Please select a category</option>
            <option value={"bills"}>Bills</option>
            <option value={"general"}>General</option>
            <option value={"entertainment"}>Entertainment</option>
            <option value={"income"}>Income</option>
            <option value={"groceries"}>Groceries</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Update Transaction
        </button>
      </form>
      <br />
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/transactions/${id}`)}
      >
        Back
      </button>
    </div>
  );
}

export default EditTransaction;
