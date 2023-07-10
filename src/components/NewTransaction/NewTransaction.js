import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewTransaction() {
  const navigate = useNavigate();
  const [isWithdrawal, setIsWithdrawal] = useState(true);
  const [transaction, setTransaction] = useState({
    name: "",
    amount: 0,
    date: "",
    category: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    //console.log(transaction);
    let URL =
      process.env.NODE_ENV === "production"
        ? `https://budget-app-back-end-czu9.onrender.com/transactions/new-transactions`
        : `http://localhost:3001/transactions/new-transactions`;

    try {
      await axios.post(URL, transaction);
      alert(`Successfully Created`);
      navigate(`/transactions`);
    } catch (error) {
      console.log(error);
    }
    setTransaction({
      name: "",
      amount: 0,
      date: "",
      from: "",
      category: "",
    });
  }
  function amountOnChange(e) {
    //console.log(e.target.value);

    if (isWithdrawal) {
      // let localTest = { ...transaction, amount: 0 - e.target.value };
      // console.log(localTest);
      setTransaction({ ...transaction, amount: 0 - Number(e.target.value) });
    } else {
      setTransaction({ ...transaction, amount: Number(e.target.value) });
    }
  }
  function handleOnChange(id, value) {
    // console.log(id, value);
    setTransaction({ ...transaction, [id]: value });
  }
  return (
    <div className="container-md">
      <h1>Add a new item</h1>
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
            onChange={amountOnChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">From</label>
          <input
            type="text"
            id={"from"}
            className="form-control"
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
          CREATE NEW ITEM
        </button>
      </form>
    </div>
  );
}

export default NewTransaction;
