import address from './address';

export default () => {
	return {
		devServer: {
			host: address.ip,
			port: address.port,
			disableHostCheck: true,
			hot: true,
			noInfo: true,
			inline: true,
			watchOptions: {
				ignored: /node_modules/
			}
		}
	}
};



