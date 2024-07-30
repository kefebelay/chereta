/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'class',
    
    extend: {
      colors:{
      'text': 'var(--text)',
      'background': 'var(--background)',
      'primary': 'var(--primary)',
      'secondary': 'var(--secondary)',
      'accent': 'var(--accent)',
      'nav-bg': 'var(--nav-bg)',
      'background2':'var(--background2)',
      'background3':'var(--background3)',
      'glow':'var(--glow)',
    },
    },
  },
  plugins: [],
}

