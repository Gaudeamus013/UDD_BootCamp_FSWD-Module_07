import React from 'react';

const PushNotificationButton = () => {
  const handleSubscribe = () => {
    // Lógica para suscribirse a notificaciones push
    console.log('Suscrito a notificaciones push');
  };

  return (
    <button onClick={handleSubscribe} className="bg-blue-500 text-white px-4 py-2 rounded">
      Suscribirse a Notificaciones
    </button>
  );
};

export default PushNotificationButton;