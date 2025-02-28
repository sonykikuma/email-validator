import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaTelegram } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-4 border-top">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        {/* Left: Logo & Copyright */}
        <div className="d-flex align-items-center ">
          <h5 className="fw-bold me-3">
            VerifyMail<span className="text-primary">X</span>
          </h5>
        </div>
        <div>
          {" "}
          <span className="text-muted">
            copyright © 2025 VerifyMailX. All rights reserved.
          </span>
        </div>

        <div className="d-flex gap-3 my-3 my-md-0">
          <Link to="/" className="text-muted">
            <FaFacebookF size={24} />
          </Link>
          <Link to="/" className="text-muted">
            <FaTwitter size={24} />
          </Link>
          <Link to="/" className="text-muted">
            <FaYoutube size={24} />
          </Link>
          <Link to="/" className="text-muted">
            <FaTelegram size={24} />
          </Link>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-light border d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <MdLanguage size={20} className="me-2" />
            English
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/">
                English
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Español
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Français
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
