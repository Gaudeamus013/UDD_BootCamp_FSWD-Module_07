import React from 'react';
import ProductSuggestions from '../components/ProductSuggestions';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bienvenidos a Cruz & Valencia</h1>
      <ProductSuggestions currentProductId={null} />
    </div>
  );
};

export default HomePage;