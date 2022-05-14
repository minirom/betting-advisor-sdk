module.exports = {
	env: {
		node: true,
	},
	extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
	settings: {},
	rules: {
		radix: 0,
		'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 1,
		'no-unreachable': process.env.NODE_ENV === 'production' ? 2 : 1,
		'import/no-extraneous-dependencies': 'off',
		'no-param-reassign': ['error', { props: false }],
		'import/extensions': 0,
		'no-restricted-syntax': 0,
		'no-await-in-loop': 0,
	},
	ignorePatterns: ['dist/', 'node_modules/', 'build/'],
};
