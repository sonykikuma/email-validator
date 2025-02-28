import React, { useEffect, useState } from "react";
import ValidationResults from "../components/ValidationResults";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BsEnvelope, BsCheckCircle, BsXCircle, BsTrash } from "react-icons/bs";

const Dashboard = () => {
  const [validationResults, setValidationResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 10;

  useEffect(() => {
    const storedResults = localStorage.getItem("validationResults");
    if (storedResults) {
      setValidationResults(JSON.parse(storedResults));
    }
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalCount = validationResults.length;
  const validCount = validationResults.filter(
    (r) => r.status === "Valid"
  ).length;
  const invalidCount = validationResults.filter(
    (r) => r.status === "Invalid"
  ).length;
  const disposableCount = validationResults.filter(
    (r) => r.status === "Disposable"
  ).length;

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row g-4 text-center mt-5">
          <div className="col-md-3 ">
            <div className="card shadow-lg p-3 border-primary bg-light">
              <BsEnvelope size={40} className="text-primary mb-2" />
              <h5 className="mb-1">Total Emails</h5>
              <h4 className="text-primary">{totalCount}</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-lg p-3 border-success bg-light">
              <BsCheckCircle size={40} className="text-success mb-2" />
              <h5 className="mb-1">Valid Emails</h5>
              <h4 className="text-success">{validCount}</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-lg p-3 border-danger bg-light">
              <BsXCircle size={40} className="text-danger mb-2" />
              <h5 className="mb-1">Invalid Emails</h5>
              <h4 className="text-danger">{invalidCount}</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-lg p-3 border-warning bg-light">
              <BsTrash size={40} className="text-warning mb-2" />
              <h5 className="mb-1">Disposable Emails</h5>
              <h4 className="text-warning">{disposableCount}</h4>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <ValidationResults
            validationResults={validationResults}
            currentPage={currentPage}
            emailsPerPage={emailsPerPage}
            paginate={paginate}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
