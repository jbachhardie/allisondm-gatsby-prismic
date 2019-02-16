import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerWeight: 300,
  headerFontFamily: [
    'Antonio',
    'Avenir Next',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif'
  ],
  bodyFontFamily: ['Georgia', 'serif'],
  overrideStyles: () => ({
    h1: {
      textTransform: 'uppercase'
    }
  })
})

export default typography
