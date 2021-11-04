import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Cards({ tasks }) {
  function formatSingleDigit(number) {
    const oneDigit = 9;
    return number <= oneDigit ? `0${number}` : number;
  }

  function dateString(date) {
    const day = formatSingleDigit(date.getDay());
    const month = formatSingleDigit(date.getMonth());
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    tasks.map(({ _id: id, info, createdAt }) => (
      <Link to={ `/${id}` } className="cardWrapper" key={ id }>
        <p className="cardInfo">{info}</p>
        <hr />
        <p className="cardDate">{dateString(new Date(createdAt))}</p>
      </Link>
    ))
  );
}
