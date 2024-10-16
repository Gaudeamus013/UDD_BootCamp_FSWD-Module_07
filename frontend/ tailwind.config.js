module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E40AF',
          secondary: '#1E3A8A',
          accent: '#FBBF24'
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  };