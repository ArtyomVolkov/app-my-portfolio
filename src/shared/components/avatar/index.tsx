import React from 'react';

import MuiAvatar from '@mui/material/Avatar';

import './style.scss';

interface IAvatar {
  title: string,
  subtitle: string,
  image?: any
}

const Avatar: React.FC<IAvatar> = ({ title, subtitle, image }) => {
  const [firstName, lastName] = title.split(' ');

  return (
    <div className="avatar">
      <MuiAvatar>
        {
          !image ? `${firstName[0]}${lastName[0]}` : <img src={image} alt="avatar" />
        }
      </MuiAvatar>
      <div className="info">
        <label className="title">{title}</label>
        <label className="sub-title">{subtitle}</label>
      </div>
    </div>
  );
};

export default Avatar;
