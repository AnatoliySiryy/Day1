var path = require('path');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  devServer: {
    static: path.join(__dirname, 'src'),
    compress: true,
    port: 8080
  }
};
