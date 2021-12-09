const AutoImport =require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://101.132.68.0:3000/admin/api',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        }
    },
    // configureWebpack: {
    //     plugins: [
    //         AutoImport({
    //             resolvers: [ElementPlusResolver()],
    //         }),
    //         Components({
    //             resolvers: [ElementPlusResolver()],
    //         }),
    //     ],
    // }

}