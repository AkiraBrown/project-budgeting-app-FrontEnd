import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ShowTransactions() {
  const [transaction, setTransaction] = useState("");
  const [toggleModal, setModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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
      setTransaction(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function HandleDate() {
    let dateObj = new Date(transaction.date); //`${new Date(transaction.date)}`;
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newDate = year + "-" + month + "-" + day;

    return <h1>{newDate}</h1>;
  }

  async function handleDelete() {
    let URL =
      process.env.NODE_ENV === "production"
        ? `https://budget-app-back-end-czu9.onrender.com/transactions/delete-transactions/${id}`
        : `http://localhost:3001/transactions/delete-transactions/${id}`;
    try {
      await axios.delete(URL);
      alert(`Transaction successfully deleted. The IRS has been notified`);
      navigate(`/transactions`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {toggleModal ? (
        <>
          <div className="container">
            <br />
            <div className="card text-bg-secondary shadow-lg">
              <div className="card-header">
                Are you sure you want to delete transaction
              </div>
              <div className="card-body">
                <p className="card-text">
                  Once you delete this transaction it will be gone forever!
                </p>
                <div className="container">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <br />
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <br />
            <HandleDate />
            <br />
            <div className="card text-bg-info shadow-lg">
              <div className="card-header">
                <h4 className="card-title">{`${transaction.name}: $ ${transaction.amount}`}</h4>
              </div>
              <div className="card-body">
                <p className="card-text">{`From: ${transaction.from}`}</p>
                <p className="card-text">{`Category: ${transaction.category}`}</p>
              </div>
            </div>
            <br />
            <div className="container text-center row">
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/transactions`)}
                >
                  Back
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/edit-transactions/${id}`)}
                >
                  Edit
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ShowTransactions;
