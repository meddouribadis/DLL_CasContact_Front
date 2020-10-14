import React, { useEffect } from "react";
import logo from '../../Assets/univ_evvry_logo.png';

function NavBar() {

  return (
      <nav className="site-header sticky-top">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" className={"img-fluid logo"}/>
          </a>
          <a className="py-2 d-none d-md-inline-block" href="#">Tour</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Product</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Features</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Enterprise</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Support</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Pricing</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Cart</a>
        </div>
      </nav>
  );
}

export { NavBar };
