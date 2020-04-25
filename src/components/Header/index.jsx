import React from 'react';
import logo from '../../assets/pairamid-logo.png';

    // <header className="flex md:justify-center p-4 md:p-12 md:h-screen border-gray-border border-b-2 md:border-r-2 md:border-b-0"></header>
const Header = (props) => (
    <header className="flex lg:justify-center p-4 lg:p-12 lg:h-screen border-gray-border border-b-2 lg:border-r-2 lg:border-b-0">
        <div>
            <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full h-auto max-w-logo lg:mt-8" />
        </div>
    </header>
);

export default Header;
