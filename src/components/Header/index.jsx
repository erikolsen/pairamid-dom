import React from 'react';
import logo from '../../assets/pairamid-logo.png';
import './Header.scss';

const Header = (props) => (
    <header className="pym-header flex justify-center p-12">
        <img src={logo} alt='logo' className='h-10'/>
    </header>
);

export default Header;
