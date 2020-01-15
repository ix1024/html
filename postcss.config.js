// console.log(require('postcss-plugin-px2rem'))

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-plugin-px2rem')({ rootValue: 75 })
  ]
}