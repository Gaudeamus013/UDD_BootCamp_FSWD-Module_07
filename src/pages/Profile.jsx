import React, { useState, useEffect } from 'react';
import { getProfile, createContent } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        setUser(response.data);
      } catch (err) {
        setError('Error al cargar el perfil. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  // Resto del componente...
};

export default Profile;