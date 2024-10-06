const webpack = require('webpack');

module.exports = {
    webpack: (config, env) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            buffer: require.resolve('buffer/'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
        };

        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            })
        );

        return config;
    },
};
