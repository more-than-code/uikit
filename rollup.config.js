import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import pug from 'rollup-plugin-pug';
import babel from 'rollup-plugin-babel';

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
			postcss(),
			pug(),
			resolve(), // so Rollup can find `ms`
			// babel({
			// 	plugins: ['external-helpers'],
      		// 	externalHelpers: true,
			// 	exclude: 'node_modules/**' // only transpile our source code
			// }),
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
		output: [{
				file: pkg.main,
				format: 'cjs'
			},
			{
				file: pkg.module,
				format: 'es'
			}
		],
		plugins: [
			postcss(),
			pug(),
			// babel({
			// 	plugins: ['external-helpers'],
      		// 	externalHelpers: true,
			// 	exclude: 'node_modules/**' // only transpile our source code
			// })
		]
	}
];