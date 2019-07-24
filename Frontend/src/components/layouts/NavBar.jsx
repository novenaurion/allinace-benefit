import React, { Component } from 'react';

class NavBar extends Component {

    render() {

        return (
            <div>
                <div className="row border-bottom">
                    <nav className="navbar navbar-static-top" role="navigation" >
                        <div className="navbar-header">
                            <a href="#" className="navbar-minimalize minimalize-styl-2 btn btn-primary" ><i className="fa fa-bars"></i> </a>
                        </div>
                        <ul className="nav navbar-top-links navbar-right">
                            <li>
                                <a href="login.html">
                                    <i className="fa fa-sign-out"></i> Log out
                    </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default NavBar;
