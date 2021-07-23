import React from 'react';
// PRIME REACT
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import './SidebarComp.css'
import { Link } from 'react-router-dom';
import { SplitButton } from 'primereact/splitbutton';
import { PanelMenu } from 'primereact/panelmenu';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

class SidebarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleLeft: true,
            nodes: null,
            activeIndex: null
        }
    }

    render() {
        return (
            <>
                <input type="checkbox" id="sidebar-toggle" />
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h3 className="brand">
                            <span>pharmaclick</span>
                        </h3>
                        <label for="sidebar-toggle" className="ti-menu-alt"></label>
                    </div>

                    <div className="sidebar-menu">

                        <ul style={{ position: 'relative', right: 17 }}>
                            <li>
                                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                    <span className="ti-clipboard"></span>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/product-management" style={{ textDecoration: 'none' }}>
                                    <span className="ti-folder"></span>
                                    <span>Pack Product</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <span className="ti-time"></span>
                                    <span>Transactions</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <span className="ti-book"></span>
                                    <span>Revenue</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <span className="ti-settings"></span>
                                    <span>Account</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="main-content">
                    <header>
                        <div class="search-wrapper">
                            <span class="ti-search"></span>
                            <input type="search" placeholder="Search" />
                        </div>

                        <div class="social-icons">
                            <span class="ti-bell"></span>
                            <span class="ti-comment"></span>
                            <div></div>
                        </div>
                    </header>


                </div>


                {/* Ini batas wrapper */}
            </>
        );
    }
}

export default SidebarComp;