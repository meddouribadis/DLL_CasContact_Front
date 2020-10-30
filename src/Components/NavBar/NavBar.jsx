import React, { useEffect } from "react";
import logo from '../../Assets/univ_evvry_logo.png';
import {useSelector} from "react-redux";

function NavBar() {

    const user = useSelector(state => state.authentication.user);

    useEffect(() => {
    }, []);

    function UserInfo(){
        if (user) {
            return (
                <div className="dropdown show">
                    <a className="py-2 d-none d-md-inline-block dropdown-toggle" href="#" role="button" id="dropdownMenuUser"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.firstName}
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuUser">
                        <a className="dropdown-item" href="/profile">Mon profil</a>
                        <a className="dropdown-item" href="#">Contact</a>
                        <a className="dropdown-item" href="/login">Se déconnecter</a>
                    </div>
                </div>
            );
        }
        return <a className="py-2 d-none d-md-inline-block" href="/login">S'inscrire</a>;
    }

    return (
      <nav className="site-header sticky-top">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" className={"img-fluid logo"}/>
          </a>
          <a className="py-2 d-none d-md-inline-block" href="/">Accueil</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Product</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Features</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Enterprise</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Support</a>
          <a className="py-2 d-none d-md-inline-block" href="#">Pricing</a>
          <UserInfo/>
        </div>
      </nav>
  );
}

export { NavBar };
