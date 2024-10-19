import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { validateEmail, validatePassword, validateName } from '../utils/validations';

const SignUp = () => {
  // ... (código existente)

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(formData.nombre)) newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ... (resto del código)
};

export default SignUp;