import React from 'react';

const Notification = ({ mensaje, tipo }) => {
  return (
    <div className={`p-4 mb-4 ${tipo === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}>
      {mensaje}
    </div>
  );
};

export default Notification;