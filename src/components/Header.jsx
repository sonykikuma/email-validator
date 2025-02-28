import React from "react";
import { NavLink } from "react-router-dom";
import { BsEnvelopeCheck, BsFillEnvelopeCheckFill } from "react-icons/bs";
import { FaSearch, FaCode, FaLinkedin } from "react-icons/fa";

const Header = () => {
  return (
    <header
      className="shadow bg-white fixed-top"
      style={{ width: "100%", zIndex: "1030" }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light px-4 py-3">
          <NavLink
            className="navbar-brand d-flex align-items-center fw-bold"
            to="/"
          >
            <BsEnvelopeCheck size={28} className="me-2 text-primary" />{" "}
            <span>
              VerifyMail<span className="text-primary">X</span>
            </span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-4">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="productsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
                <div
                  className="dropdown-menu p-3 shadow-lg border-0"
                  aria-labelledby="productsDropdown"
                >
                  <div className="d-flex flex-column">
                    <a
                      className="dropdown-item d-flex align-items-center py-2"
                      href="#"
                    >
                      <BsFillEnvelopeCheckFill
                        className="me-2 text-primary"
                        size={24}
                      />
                      <div>
                        <strong>Email Validation</strong>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center py-2"
                      href="#"
                    >
                      <FaSearch className="me-2 text-primary" size={24} />
                      <div>
                        <strong>Email Finder</strong>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center py-2"
                      href="#"
                    >
                      <FaCode className="me-2 text-primary" size={24} />
                      <div>
                        <strong>Email Validation API</strong>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center py-2"
                      href="#"
                    >
                      <FaLinkedin className="me-2 text-primary" size={24} />
                      <div>
                        <strong>LinkedIn Email Finder</strong>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <a className="nav-link ps-4" href="#">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary ms-2" href="#">
                  Start For Free
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
