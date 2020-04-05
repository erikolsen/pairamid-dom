import React from 'react';
import logo from '../../assets/pairamid-logo.png';

const Header = (props) => (
    <header className="pmd-header flex md:justify-center p-4 md:p-12 md:h-screen border-gray-border border-b-2 md:border-r-2 md:border-b-0">
        <div>
            <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full h-auto max-w-logo md:mt-8" />
        </div>
    </header>
);

export default Header;
