import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Chart js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//----------------------//
function Dashboard() {
  const navigate = useNavigate();
  const [transactionsArr, setTransactionArr] = useState([]);
  const [total, setTotal] = useState(0);
  // const [lineLabels, setLineLabels] = useState([
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let URL =
      process.env.NODE_ENV === "production"
        ? "https://budget-app-back-end-czu9.onrender.com/transactions"
        : "http://localhost:3001/transactions";
    try {
      let result = await axios.get(URL);
      //console.log(result.data);

      let sortedTransactions = result.data.sort((a, b) => {
        // let newB = new Date(`${b.date}T${b.time}Z`);
        // let newA = new Date(`${a.date}T${a.time}Z`);
        return new Date(b.date) - new Date(a.date);
        // return newB - newA;
      });
      // sortedTransactions = sortedTransactions.map((item) => {
      //   let dateObj = new Date(date);
      //   let month = dateObj.getUTCMonth() + 1;
      //   let day = dateObj.getUTCDate();
      //   let year = dateObj.getUTCFullYear();
      //   let newDate = year + "-" + month + "-" + day;
      //   console.log(newDate);
      // });
      //console.log(sortedTransactions);

      let localTotal = 0;
      sortedTransactions.map(({ amount }) => (localTotal += amount));
      //console.log(localTotal);
      setTotal(localTotal);
      setTransactionArr(sortedTransactions);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">
        Bank Account Total: ${" "}
        <strong
          style={
            total > 0
              ? { color: "green" }
              : total === 0
              ? { color: "yellow" }
              : { color: "red" }
          }
        >
          {total}
        </strong>
      </h1>
      <table className="table text-center table-hover">
        <thead>
          <tr>
            <th scope="col">{"Date"}</th>
            <th scope="col">{"Details"}</th>
            <th scope="col">{"Amount"}</th>
          </tr>
        </thead>
        <tbody>
          {transactionsArr.map(({ id, amount, date, category, from, name }) => {
            let dateObj = new Date(date);
            let month = dateObj.getUTCMonth() + 1;
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();
            let newDate = year + "-" + month + "-" + day;

            //new Date(date) just in case
            return (
              <tr
                key={id}
                className="text-center"
                onClick={() => navigate(`/transactions/${id}`)}
              >
                <td>{`${newDate}`}</td>
                <td>{`${from} (${name}): ${category} `}</td>
                <td
                  style={
                    Number(amount) > 0
                      ? { color: "green" }
                      : Number(amount) === 0
                      ? { color: "yellow" }
                      : { color: "red" }
                  }
                >
                  {Number(amount)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
