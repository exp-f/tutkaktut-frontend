import minify from 'babel-minify-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default () => {
	return {
		plugins: [
			// new minify(),
			new CompressionPlugin({
				test: /\.js$|\.css$/,
				threshold: 10240,
				minRatio: 0
			}),
		]
	}
};
