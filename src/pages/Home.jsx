import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white">
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    Anunciando nuestro próximo evento. {' '}
                    <Link to="/evento-proximo" className="font-semibold text-blue-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Leer más <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Pet Pixel: Contenido exclusivo de mascotas
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  Descubre contenido único de las mascotas más adorables. Suscríbete a tus creadores favoritos y comparte la alegría de las mascotas.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <Link
                    to="/signup"
                    className="inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-blue-700 hover:ring-blue-700"
                  >
                    Empezar
                    <span className="text-blue-200" aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link
                    to="/login"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Iniciar sesión
                    <span className="text-gray-400" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;