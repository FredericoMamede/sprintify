import React from 'react';


const AlertIcon = ({ type }) => {
  let icon;


  switch (type) {
    case 'Done':
      icon = "/Assets/done.png";
      break;
    case 'Help':
      icon = "/Assets/help.png";
      break;
    case 'Risk':
      icon = "/Assets/risk.png";
      break;
    // default:
    //   icon = defaultIcon;
  }


  return <img src={icon} alt={type} />;
};

export default AlertIcon;