import React from 'react';

import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import './style.scss';

interface TransactionData {
  title: string,
  date: string,
  color?: string,
  icon?: OverridableComponent<SvgIconTypeMap>
}

interface Transaction {
  title: string,
  data: Array<TransactionData>
}

const Transaction: React.FC<Transaction> = ({ title, data }) => {
  return (
    <div className="history-widget">
      <div className="headline">
        <p className="title">{ title }</p>
      </div>
      <ul className="history-data">
        {
          data.map((item, index) => (
            <li key={index}>
              <div className="icon" style={{background: item.color }}>
                <item.icon />
              </div>
              <div className="details">
                <label className="title">{item.title}</label>
                <label className="date">{item.date}</label>
              </div>
              <div className="divider" />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Transaction;
