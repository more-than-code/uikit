import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import scss from 'rollup-plugin-scss';
import pug from 'rollup-plugin-pug';

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: 'uikit',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			scss(),
			pug(),
			resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiplenpm install --save-dev rollup-plugin-scss

	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			scss(),
			pug()
		]
	}
];
