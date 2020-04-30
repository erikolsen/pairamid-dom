import React from 'react';
import logo from '../../assets/pairamid-logo.png';
import { Link } from "react-router-dom";

const Header = (props) => (
    <div>
        <header className="lg:justify-center p-4 lg:p-12 lg:h-screen border-gray-border border-b-2 lg:border-r-2 lg:border-b-0">
            <Link to='/'>
                <div className='my-8'>
                    <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full h-auto max-w-logo lg:mt-8" />
                </div>
            </Link>
            <ul className='my-8'>
                <li className='text-gray'>
                    <Link to='/history'>History</Link>
                </li>
            </ul>
        </header>
    </div>
);

export default Header;
