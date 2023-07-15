const prettier = 'prettier --plugin-search-dir . --write';
const eslint = 'eslint --fix';

export default {
	'*': [prettier],
	'*.{js,ts,svelte}': [eslint, prettier]
};
