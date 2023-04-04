const path = require('path')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin  = require('compression-webpack-plugin')

const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          filter: source => {
            return !source.includes('index.html')
          }
        },
      ],
    }),
    new CompressionPlugin({
      test: /.(js|css)$/,          // 只生成css,js压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip',           // 压缩格式,默认是gzip
      test: /.(js|css)$/,          // 只生成css,js压缩文件
      threshold: 10240,            // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8                // 压缩率,默认值是 0.8
    })
  ]
})
