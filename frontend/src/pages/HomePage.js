import React from 'react';
import { Helmet } from 'react-helmet';
import ProductSuggestions from '../components/ProductSuggestions';

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Cruz & Valencia</title>
        <meta name="description" content="Bienvenido a Cruz & Valencia. Explora nuestra colección de perfumes de nicho exclusivos." />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Bienvenidos a Cruz & Valencia</h1>
      <ProductSuggestions currentProductId={null} />
    </div>
  );
};

export default HomePage;