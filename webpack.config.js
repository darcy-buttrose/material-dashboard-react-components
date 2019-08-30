var path = require('path');
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
    },
    resolve: {
        extensions: [
            ".webpack.js", ".web.js", ".js", ".json", ".jsx"
        ]
    },
    module: {
        rules: [
            {
                oneOf: [{
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /(node_modules|bower_components|build)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/env",
                                "@babel/react"
                            ],
                            "plugins": [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        }
                    }
                },
                // "file" loader makes sure those assets get served by WebpackDevServer.
                // When you `import` an asset, you get its (virtual) filename.
                // In production, they would get copied to the `build` folder.
                // This loader doesn't use a "test" so it will catch all modules
                // that fall through the other loaders.
                {
                    loader: require.resolve('file-loader'),
                    // Exclude `js` files to keep "css" loader working as it injects
                    // its runtime that would otherwise be processed through "file" loader.
                    // Also exclude `html` and `json` extensions so they get processed
                    // by webpacks internal loaders.
                    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                }
                // ** STOP ** Are you adding a new loader?
                // Make sure to add the new loader(s) before the "file" loader.
                ]
            }
        ]
    },
    externals: {
        'react': 'commonjs react', // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
        'react-dom': 'commonjs react-dom',
        'react-router-dom': 'commonjs react-router-dom'
    }
};
