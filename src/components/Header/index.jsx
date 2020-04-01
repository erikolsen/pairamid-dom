import React from 'react';
import logo from '../../assets/pairamid-logo.png';
import './Header.scss';

const Header = (props) => (
    <header className="pmd-header flex md:justify-center p-4 md:p-12">
        <div>
            <img src={logo} alt='logo' width="169" height="40" />
        </div>
    </header>
);

export default Header;
