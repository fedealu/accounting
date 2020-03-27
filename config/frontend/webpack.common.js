require("module-alias/register");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const PATHS = require("../paths");

__webpack_public_path__ = process.env.publicPath || PATHS.frontend.public_path;

module.exports = {
	entry: {
		main: "./src/main.tsx"
	},
	output: {
		filename: `${__webpack_public_path__}/[name].bundle.js`,
		path: PATHS.frontend.dist
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
		modules: [
			path.resolve(__dirname, "src"),
			"node_modules",
			path.resolve(__dirname, "src", "styles")
		],
		alias: PATHS.frontend.aliases || {}
	},
	module: {
		rules: [
			{
				test: /\.s?[ac]ss$/i,
				use: [
					"style-loader",
					"css-modules-typescript-loader",
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							sassOptions: {
								outputStyle: "compressed"
							}
						}
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: ["ts-loader"]
			},
			{
				test: /.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ["es2015", "react", "stage-2"]
				}
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true // webpack@2.x and newer
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			react: "React",
			"react-dom": "ReactDom"
		}),
		new HTMLWebpackPlugin({
			template: "./index.html"
		})
	]
};
