import React from 'react';
import logo from '../../assets/pairamid-logo.png';
import { Link } from "react-router-dom";

const Header = () => (
    <div>
        <header className="flex items-center justify-between lg:pt-12 lg:block p-4 border-gray-border border-b-2 lg:justify-center lg:h-screen lg:border-r-2 lg:border-b-0">
            <Link to='/'>
                <div className='my-4 lg:my-8'>
                    <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo lg:mt-8" />
                </div>
            </Link>
            <ul className='flex lg:block'>
                <li className='text-gray m-2'>
                    <Link to='/'>Today's Pairs</Link>
                </li>
                <li className='text-gray m-2'>
                    <Link to='/frequency'>Pair Frequency</Link>
                </li>
            </ul>
        </header>
    </div>
);

export default Header;
