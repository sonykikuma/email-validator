import React from "react";
import { useLocation } from "react-router-dom";
import ValidationResults from "../components/ValidationResults";
import Header from "../components/Header";

const Dashboard = () => {
  const location = useLocation();
  const validationResults = location.state?.validationResults || [];

  return (
    <>
      <Header />
      <div className="container my-5">
        <h1 className="text-center">Validation Results</h1>
        {validationResults.length === 0 ? (
          <p className="text-center">No emails validated yet.</p>
        ) : (
          <ValidationResults validationResults={validationResults} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
// import React, { useState } from "react";
// import Pagination from "./Pagination";
// import { GrSort } from "react-icons/gr";
// import { BsDownload } from "react-icons/bs";
// import Download from "./Download";

// const ValidationResults = ({
//   validationResults,
//   currentPage,
//   emailsPerPage,
//   paginate,
// }) => {
//   const [filterStatus, setFilterStatus] = useState("all");
//   const totalCount = validationResults.length;
//   const validCount = validationResults.filter(
//     (r) => r.status === "Valid"
//   ).length;
//   const invalidCount = validationResults.filter(
//     (r) => r.status === "Invalid"
//   ).length;
//   const othersCount = validationResults.filter(
//     (r) => !["Valid", "Invalid"].includes(r.status)
//   ).length;

//   const filteredResults = validationResults.filter((result) => {
//     if (filterStatus === "valid") return result.status === "Valid";
//     if (filterStatus === "invalid") return result.status === "Invalid";
//     if (filterStatus === "others")
//       return !["Valid", "Invalid"].includes(result.status);
//     return true; //default show all
//   });

//   const indexOfLastEmail = currentPage * emailsPerPage;
//   const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
//   // const currentEmails = validationResults.slice(
//   //   indexOfFirstEmail,
//   //   indexOfLastEmail
//   // );
//   const currentEmails = filteredResults.slice(
//     indexOfFirstEmail,
//     indexOfLastEmail
//   );

//   const totalPages = Math.ceil(filteredResults.length / emailsPerPage);

//   return (
//     <div className="my-5 ">
//       <h2 className="mt-3 text-center">Validation Results</h2>
//       {/* Radio Buttons for Sorting */}
//       <div className="mb-3 align-items-center justify-content-center d-flex">
//         <GrSort size={24} style={{ color: "blue" }} />
//         <strong> Status:</strong>
//         <div className="form-check form-check-inline ms-3">
//           <input
//             className="form-check-input"
//             type="radio"
//             id="all"
//             name="statusFilter"
//             value="all"
//             checked={filterStatus === "all"}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           />
//           <label className="form-check-label" htmlFor="all">
//             All
//           </label>
//           <div className="text-muted" style={{ fontSize: "12px" }}>
//             {totalCount}
//           </div>
//         </div>
//         <div className="form-check form-check-inline">
//           <input
//             className="form-check-input"
//             type="radio"
//             id="valid"
//             name="statusFilter"
//             value="valid"
//             checked={filterStatus === "valid"}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           />
//           <label className="form-check-label" htmlFor="valid">
//             Valid
//           </label>
//           <div className="text-muted" style={{ fontSize: "12px" }}>
//             {validCount}
//           </div>
//         </div>
//         <div className="form-check form-check-inline">
//           <input
//             className="form-check-input"
//             type="radio"
//             id="invalid"
//             name="statusFilter"
//             value="invalid"
//             checked={filterStatus === "invalid"}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           />
//           <label className="form-check-label" htmlFor="invalid">
//             Invalid
//           </label>
//           <div className="text-muted" style={{ fontSize: "12px" }}>
//             {invalidCount}
//           </div>
//         </div>
//         <div className="form-check form-check-inline">
//           <input
//             className="form-check-input"
//             type="radio"
//             id="others"
//             name="statusFilter"
//             value="others"
//             checked={filterStatus === "others"}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           />
//           <label className="form-check-label" htmlFor="others">
//             Others
//           </label>
//           <div className="text-muted" style={{ fontSize: "12px" }}>
//             {othersCount}
//           </div>
//         </div>
//       </div>

//       {filteredResults.length === 0 ? (
//         <p>No emails validated yet.</p>
//       ) : (
//         <>
//           {" "}
//           <div
//             className="table-responsive mx-auto"
//             style={{ maxWidth: "600px" }}
//           >
//             <table className="table table-bordered shadow rounded-3">
//               <thead className="table-light">
//                 <tr>
//                   <th>Email</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentEmails.map((result, index) => (
//                   <tr key={index}>
//                     <td>{result.email}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           result.status === "Valid"
//                             ? "bg-success"
//                             : result.status === "Invalid"
//                             ? "bg-danger"
//                             : result.status === "Disposable"
//                             ? "bg-warning"
//                             : "bg-secondary"
//                         }`}
//                       >
//                         {result.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {/* Pagination starts here */}
//           {totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               paginate={paginate}
//             />
//           )}
//           <Download validationResults={filteredResults} />
//         </>
//       )}
//     </div>
//   );
// };

// export default ValidationResults;
