import React, { useState } from "react";
import Pagination from "./Pagination";
import { GrSort } from "react-icons/gr";
import Download from "./Download";

const ValidationResults = ({
  validationResults,
  currentPage,
  emailsPerPage,
  paginate,
}) => {
  const [isSorted, setIsSorted] = useState(false);

  const totalCount = validationResults.length;
  const validCount = validationResults.filter(
    (r) => r.status === "Valid"
  ).length;
  const invalidCount = validationResults.filter(
    (r) => r.status === "Invalid"
  ).length;
  const othersCount = totalCount - validCount - invalidCount;

  // Sorting function: Valid > Invalid > Others
  const sortedResults = [...validationResults].sort((a, b) => {
    const order = { Valid: 1, Invalid: 2 };
    return (order[a.status] || 3) - (order[b.status] || 3);
  });

  // If sorted is enabled, use sortedResults; otherwise, use original data
  const displayedResults = isSorted ? sortedResults : validationResults;

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = displayedResults.slice(
    indexOfFirstEmail,
    indexOfLastEmail
  );

  const totalPages = Math.ceil(displayedResults.length / emailsPerPage);

  return (
    <div className="my-5">
      <h2 className="mt-3 text-center">
        <span className="text-primary">V</span>alidation Results
      </h2>
      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <div
          className={`card shadow-sm p-3 text-center d-flex align-items-center justify-content-center flex-column ${
            !isSorted ? "border-primary bg-light" : ""
          }`}
          style={{ cursor: "pointer", width: "200px" }}
          onClick={() => setIsSorted(false)}
        >
          <GrSort size={24} className="text-primary mb-2 " />

          <h6 className="mb-1">As Received</h6>
        </div>

        <div
          className={`card shadow-sm p-3 text-center d-flex align-items-center justify-content-center flex-column ${
            isSorted ? "border-primary bg-light" : ""
          }`}
          style={{ cursor: "pointer", width: "200px" }}
          onClick={() => setIsSorted(true)}
        >
          <GrSort size={24} className="text-success mb-2" />
          <h6 className="mb-1">Sorted View </h6>
          <small className="text-muted">Valid → Invalid → Others</small>
        </div>
      </div>
      {displayedResults.length === 0 ? (
        <p>No emails validated yet.</p>
      ) : (
        <>
          <div
            className="table-responsive mx-auto shadow-lg rounded-3"
            style={{ maxWidth: "600px" }}
          >
            <table className="table table-bordered ">
              <thead className="table-light">
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentEmails.map((result, index) => (
                  <tr key={index}>
                    <td>{result.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          result.status === "Valid"
                            ? "bg-success"
                            : result.status === "Invalid"
                            ? "bg-danger"
                            : result.status === "Disposable"
                            ? "bg-warning"
                            : "bg-secondary"
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}

          <Download validationResults={displayedResults} />
        </>
      )}
    </div>
  );
};

export default ValidationResults;
