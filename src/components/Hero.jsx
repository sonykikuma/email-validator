import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateEmailFormat, isDisposableEmail } from "../utils/utils";
import ValidationResults from "./ValidationResults";
import { BsUpload } from "react-icons/bs";

const Hero = () => {
  const [emailList, setEmailList] = useState("");
  const [validationResults, setValidationResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0); // for progress bar while validating

  const emailsPerPage = 10;

  useEffect(() => {
    const storedResults = localStorage.getItem("validationResults");
    const storedEmails = localStorage.getItem("emailList");
    if (storedEmails) {
    }

    if (storedResults) setValidationResults(JSON.parse(storedResults));
  }, []);

  const validateEmails = async () => {
    setLoading(true);
    setProgress(0); // Reset progress bar

    const emails = emailList
      .split(/[\n,]+/)
      .map((email) => email.trim())
      .filter((email) => email !== "");

    let results = [];
    for (let i = 0; i < emails.length; i++) {
      let status = "Valid";

      if (!validateEmailFormat(emails[i])) {
        status = "Invalid";
      } else if (isDisposableEmail(emails[i])) {
        status = "Disposable";
      } else {
        const random = Math.random();
        if (random < 0.2) status = "Catch-All";
        else if (random < 0.1) status = "Unknown";
      }

      results.push({ email: emails[i], status });

      // Update progress dynamically
      setProgress(((i + 1) / emails.length) * 100);

      // Simulate a slight delay for real-time progress update
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const mergedResults = [...validationResults, ...results].reduce(
      (acc, curr) => {
        if (!acc.find((item) => item.email === curr.email)) acc.push(curr);
        return acc;
      },
      []
    );

    setValidationResults(mergedResults);
    localStorage.setItem("validationResults", JSON.stringify(mergedResults));
    setEmailList("");

    setLoading(false);
    setProgress(0); // Hide progress bar after completion
  };

  const handleEmailListChange = (e) => {
    setEmailList(e.target.value);
    localStorage.setItem("emailList", e.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const newEmails = content
        .split(/[\n,]+/) // Supports both newline & comma-separated emails
        .map((email) => email.trim())
        .filter((email) => email !== "");

      const mergedEmails = [
        ...new Set([...emailList.split(/[\n,]+/), ...newEmails]),
      ].join("\n");

      setEmailList(mergedEmails);
      localStorage.setItem("emailList", mergedEmails);
    };

    reader.readAsText(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload({ target: { files: [file] } });
  };

  // Prevent default browser behavior for drag events
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-light mt-0">
      <div className="container ">
        <div className="py-5 ">
          <h1 className="text-center">
            <span className="text-primary">Free</span> Email Verifier
          </h1>
          <p className="text-center">
            We verified over 90 million emails in the last year.
          </p>
          <div className="shadow p-4 rounded-3 flex ">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Verify an email or list of emails here (comma or newline separated)..."
              value={emailList}
              onChange={handleEmailListChange}
            />{" "}
            <button
              className="btn btn-primary mt-3"
              onClick={validateEmails}
              disabled={loading}
            >
              {loading ? "Validating..." : "Validate"}
            </button>
          </div>
          <div className="d-flex flex-column align-items-center mt-3">
            {/* Upload Box */}
            <div
              className="bg-white shadow-sm p-3 rounded text-center d-flex flex-column align-items-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                border: "2px dashed #6c757d",
                cursor: "pointer",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <BsUpload size={24} className="text-primary mb-2" />
              <p className="mb-2 text-muted">
                Upload your list for bulk verification
              </p>
              <input
                type="file"
                accept=".txt,.csv"
                className="d-none"
                id="fileUpload"
                onChange={handleFileUpload}
              />
              <label htmlFor="fileUpload" className="btn btn-primary btn-sm">
                Choose File
              </label>
            </div>

            <p className="text-muted mt-2" style={{ fontSize: "14px" }}>
              Supports .txt and .csv files. Maximum file size: 5MB.
            </p>

            {/* Show Uploaded File Name */}
            {uploadedFile && (
              <p className="text-muted">
                Uploaded file: <strong>{uploadedFile}</strong>
              </p>
            )}
          </div>

          {/* Progress Bar (Shown While Loading) */}
          {loading && (
            <div
              className="progress mt-3"
              role="progressbar"
              aria-label="Validation Progress"
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : (
            // <Link to="/dashboard">Dashboard</Link>

            <ValidationResults
              validationResults={validationResults}
              currentPage={currentPage}
              emailsPerPage={emailsPerPage}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
