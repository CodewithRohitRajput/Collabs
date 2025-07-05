/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',    // blue-600
        secondary: '#facc15',  // yellow-400
        accent: '#10b981',     // emerald-500
        dark: '#1f2937',       // gray-800
        light: '#f3f4f6',      // gray-100
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 14px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    
  ],
}
