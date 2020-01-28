module.exports = {
  theme: {
    screens: {
      sm: '640px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      fill: theme => ({
        red: theme('colors.red.500'),
        black: theme('colors.black')
      })
    }
  },
  variants: {
    fill: ['hover']
  },
  plugins: []
};
