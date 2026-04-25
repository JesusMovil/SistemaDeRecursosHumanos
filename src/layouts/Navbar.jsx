import { useState, useEffect } from "react";
import { GrUserManager } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-custom ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container-fluid">

        <Link className="navbar-brand d-flex align-items-center" to="/">
          <GrUserManager className="brand-icon" />
          <span>Sistema RRHH</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto ms-lg-4">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/empleados")}`} to="/empleados">Empleados</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Resumen</Link>
            </li>
          </ul>

          <form className="d-flex align-items-center">
            <div className="search-box">
              <FaSearch />
              <input type="search" placeholder="Buscar equipo..." />
            </div>
          </form>

        </div>
      </div>
    </nav>
  );
}