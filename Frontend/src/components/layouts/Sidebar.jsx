import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { php_url } from '../../utils/Global';


export default class Sidebar extends Component {

    constructor() {
        super();
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <nav className="navbar-default navbar-static-side">
                    <div className="sidebar-collapse sidebar">
                        <ul className="nav metismenu" id="side-menu">
                            <li className="nav-header">
                                <div className="dropdown profile-element">
                                    <img alt="logo" className="logostyle" src="assets/img/team.svg" /><br />
                                    <span className="fontWhite">HR Management System</span>
                                </div>
                                <div className="logo-element">
                                    Marter
                                </div>
                            </li>
                            {/* <li>
                                <Link><i className="fa fa-upload"></i> <span className="nav-label">Allowance Test</span><span className="fa arrow"></span></Link>
                                <ul className="nav nav-second-level">
                                    <li className="active"><a href="/travelRequest" refresh="true">Travel Request</a></li>
                                </ul>
                            </li> */}
                            <li className="">
                                <Link to=""><i className="fa fa-upload"></i>Allowance</Link>
                                <ul className="nav nav-second-level">
                                    <li className="active"><a href="/salary_advance"><i className="fa fa-align-justify"></i>Salary Advance</a></li>
                                </ul>
                            </li>
                            <li className="">
                                <Link to=""><i className="fa fa-upload"></i>Staff Loan</Link>
                                <ul className="nav nav-second-level">
                                    <li className="active"><a href="/staff_loan"><i className="fa fa-align-justify"></i>Staff Loan List</a></li>
                                    <li className="active"><a href="/staff_loan_repayment"><i className="fa fa-calendar"></i>Repayment Schedule</a></li>
                                    <li className="active"><a href="/staff_loan_settlement"><i className="fa fa-calendar"></i>Settlement Sheet</a></li>
                                </ul>
                            </li>

                            <li className="">
                                <Link to=""><i className="fas fa-plus-circle"></i> Benefits</Link>
                                <ul className="nav nav-second-level">
                                    <li className="active"><a href="/wedding_benefit"><i className="fas fa-ring"></i>Wedding Benefits</a></li>
                                    <li className="active"><a href="/child_benefit"><i className="fas fa-baby"></i>Child Benefit</a></li>
                                    <li className="active"><a href="/funeral_benefit"><i className="fas fa-cross"></i>Funeral Benefit</a></li>
                                </ul>
                            </li>

                            <li>
                                <a target="blank" href={php_url}><i className="fa fa-user"></i> <span className="nav-label">Back</span></a>

                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        )
    }
}