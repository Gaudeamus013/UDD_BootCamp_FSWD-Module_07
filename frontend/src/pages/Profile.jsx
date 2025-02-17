import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Profile = () => {
  const { state } = useContext(AppContext);

  if (!state.user) {
    return <p>No has iniciado sesión.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Mi Perfil</h1>
      <p>Nombre: {state.user.name}</p>
      <p>Email: {state.user.email}</p>
    </div>
  );
};

export default Profile;
