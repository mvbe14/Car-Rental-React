import React, {Fragment, useState} from 'react';
import {NavLink} from "react-router-dom";

import {UserConsumer} from "../../../context/UserContext";

import './Navigation.css';


const Navigation = (props) => {

    const {user} = props;
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header>
            <div className="navbar bg-info shadow">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 justify-content-between">
                            <NavLink to="/" exact className="navbar-brand nav-link"><h3>RentCar</h3></NavLink>
                            <NavLink to="/cars/all" className="nav-link font-weight-bold">Car Fleet</NavLink>
                            {user.isLoggedIn ?
                                (
                                    <Fragment>
                                        {
                                            user.role === 'ADMIN' ? (
                                                    <Fragment>
                                                        <NavLink to="/cars/create" className="nav-link font-weight-bold">Add
                                                            Car</NavLink>
                                                        <NavLink to="/rents/pending" className="nav-link font-weight-bold">Pending
                                                            Rents</NavLink>
                                                        <NavLink to="/rents/active" className="nav-link font-weight-bold">Active
                                                            Rents</NavLink>
                                                    </Fragment>
                                                )
                                                : (
                                                    <Fragment>
                                                        <NavLink to="/cars/available" className="nav-link font-weight-bold">Available
                                                            Cars</NavLink>
                                                        <NavLink to={'/sales/all/' + user.username}
                                                                 className="nav-link font-weight-bold">My
                                                            Purchases</NavLink>
                                                    </Fragment>
                                                )
                                        }
                                        <div className="nav-item dropdown">
                                            <button 
                                                className="nav-link font-weight-bold text-white btn btn-link"
                                                onClick={() => setShowUserMenu(!showUserMenu)}
                                                id="userDropdown"
                                            >
                                                👤 {user.username} ▼
                                            </button>
                                            {showUserMenu && (
                                                <div className="dropdown-menu show">
                                                    <NavLink 
                                                        to={'/sales/all/' + user.username}
                                                        className="dropdown-item"
                                                        onClick={() => setShowUserMenu(false)}
                                                    >
                                                        📋 My Purchases
                                                    </NavLink>
                                                    <NavLink 
                                                        to="/logout"
                                                        className="dropdown-item text-danger"
                                                        onClick={() => setShowUserMenu(false)}
                                                    >
                                                        🚪 Logout
                                                    </NavLink>
                                                </div>
                                            )}
                                        </div>

                                    </Fragment>
                                )
                                : (
                                    <Fragment>
                                        <NavLink to="/register" className="nav-link font-weight-bold">Register</NavLink>
                                        <NavLink to="/login" className="nav-link font-weight-bold">Login</NavLink>
                                    </Fragment>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

const NavigationWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({user}) => (
                    <Navigation {...props} user={user}/>
                )
            }
        </UserConsumer>
    )
};

export default NavigationWithContext;