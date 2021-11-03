import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Cards({ tasks }) {
  return (
    tasks.map(({ _id: id, info }) => (
      <Link to={ `/${id}` } className="cardWrapper" key={ id }>
        <p className="cardInfo">{info}</p>
      </Link>
    ))
  );
}
