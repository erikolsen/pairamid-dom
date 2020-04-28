import React from 'react';
import logo from '../../assets/pairamid-logo.png';

const Header = (props) => (
    <header className="flex lg:justify-center p-4 lg:p-12 lg:h-screen border-gray-border border-b-2 lg:border-r-2 lg:border-b-0">
        <div>
            <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full h-auto max-w-logo lg:mt-8" />
        </div>
    </header>
);

export default Header;
