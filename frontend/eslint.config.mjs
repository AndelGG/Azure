import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';

const config = antfu(
  {
    typescript: true,
    stylistic: false,
    react: true,
    jsx: true,
  },
  {
    name: 'maneko/next',
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    name: 'maneko/react',
    plugins: {
      'maneko-react': pluginReact,
    },
    rules: {
      ...Object.entries(pluginReact.configs.recommended.rules).reduce(
        (acc, [key, value]) => {
          acc[key.replace('react', 'maneko-react')] = value;
          return acc;
        },
        {},
      ),
      'maneko-react/prop-types': 'off',
      'maneko-react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'maneko/jsx-a11y',
    plugins: {
      'maneko-jsx-a11y': pluginJsxA11y,
    },
    rules: {
      ...Object.entries(pluginJsxA11y.flatConfigs.recommended.rules).reduce(
        (acc, [key, value]) => {
          acc[key.replace('jsx-a11y', 'maneko-jsx-a11y')] = value;
          return acc;
        },
        {},
      ),
    },
  },
  {
    name: 'maneko/tanstack-query',
    plugins: {
      '@tanstack/query': pluginTanstackQuery,
    },
    rules: {
      ...pluginTanstackQuery.configs.recommended.rules,
      '@tanstack/query/exhaustive-deps': 'warn',
    },
  },
  {
    name: 'maneko/rewrite',
    rules: {
      'antfu/curly': 'off',
      'antfu/if-newline': 'off',
      'antfu/top-level-function': 'off',
      'no-console': 'warn',
    },
  },
  {
    name: 'maneko/sort',
    rules: {
      'perfectionist/sort-array-includes': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: {
            callback: 'on*',
            reserved: ['key', 'ref'],
          },
          groups: ['shorthand', 'reserved', 'multiline', 'unknown', 'callback'],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          groups: [
            'conditional',
            'function',
            'import',
            'intersection',
            'keyword',
            'literal',
            'named',
            'object',
            'operator',
            'tuple',
            'union',
            'nullish',
          ],
          order: 'asc',
          specialCharacters: 'keep',
          type: 'alphabetical',
        },
      ],
    },
  },
);

export default config;
