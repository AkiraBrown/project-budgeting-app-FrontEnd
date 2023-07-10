import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";
import NewTransaction from "./components/NewTransaction/NewTransaction";
import ShowTransactions from "./components/ShowTransaction/ShowTransactions";
import Error from "./components/Error/Error";
import EditTransaction from "./components/EditTransaction/EditTransaction";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/transactions" element={<Dashboard />}></Route>
        <Route path="/transactions/new" element={<NewTransaction />}></Route>
        <Route path="/transactions/:id" element={<ShowTransactions />}></Route>
        <Route
          path="/edit-transactions/:id"
          element={<EditTransaction />}
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
