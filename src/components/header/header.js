import React from 'react';

import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {

  const buttonsLabels = [
    'people', 'planets', 'starships'
  ]

  const upperCaseFirstChar = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const buttons = buttonsLabels.map((label) => {
    
    return (
      <li key={label}>
        <Link to={`/${label}/`}>
          { upperCaseFirstChar(label) }
        </Link>
      </li>
    )
  })

  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">
          StarDB
        </Link>
      </h3>
      <ul className="d-flex">
        { buttons }
      </ul>
    </div>
  );
};

export default Header;