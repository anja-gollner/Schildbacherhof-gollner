/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        cream:     '#F4EFE3',  // warmer heller Grundton
        beige:     '#E6DBC4',  // tieferes Beige (Panels/Flächen)
        terracotta:'#C75A0B',  // Hauptakzent
        sage:      '#7D8169',  // Zweitakzent (natürlich)
        ink:       '#211C15',  // warmes Anthrazit (Text/dunkle Sektionen)
        muted:     '#6F6A5E'   // gedämpfter Text
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      maxWidth: { content: '1280px' }
    }
  },
  plugins: []
}
