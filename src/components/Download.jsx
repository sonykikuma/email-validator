import React from "react";
import { BsDownload } from "react-icons/bs";

const Download = ({ validationResults }) => {
  const downloadReport = () => {
    const csvHeader = "Email,Status\n";
    const csvRows = validationResults //filteredResults
      .map((row) => `${row.email},${row.status}`)
      .join("\n");
    const csvData = csvHeader + csvRows;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create Download Link
    const a = document.createElement("a");
    a.href = url;
    a.download = "email_validation_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <button
        className="btn btn-success d-flex align-items-center"
        onClick={downloadReport}
      >
        <BsDownload size={18} className="me-2" />
        Download Report
      </button>
    </div>
  );
};

export default Download;
