module.exports = {
  // Extend base configurations
  extends: [
    'erb', // Your custom base configuration
    'plugin:react/recommended', // Recommended rules from eslint-plugin-react
    'plugin:react-hooks/recommended', // Recommended rules for React Hooks
    'plugin:@typescript-eslint/recommended', // Recommended rules for TypeScript
  ],
  plugins: [
    '@typescript-eslint', // TypeScript-specific linting rules
    'react', // React-specific linting rules
    'react-hooks', // React Hooks-specific linting rules
  ],
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  parserOptions: {
    ecmaVersion: 2022, // Use modern ECMAScript features
    sourceType: 'module', // Allow import/export statements
    ecmaFeatures: {
      jsx: true, // Allow JSX syntax
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 'off', // Allow dependencies outside of package.json
    'react/react-in-jsx-scope': 'off', // Not needed for React 17 and up
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }], // Allow JSX in .jsx and .tsx files
    'import/extensions': 'off', // Disable rules on import extensions
    'import/no-unresolved': 'off', // Disable unresolved import checks
    'import/no-import-module-exports': 'off', // Allow importing from module exports
    'no-shadow': 'off', // Disable shadow variable checks
    '@typescript-eslint/no-shadow': 'error', // Enforce no shadow variables in TypeScript
    'no-unused-vars': 'off', // Disable no-unused-vars in favor of TypeScript rule
    '@typescript-eslint/no-unused-vars': 'error', // Enforce no unused variables in TypeScript
    'react/jsx-uses-react': 'off', // Not needed for React 17 and up
    'react/jsx-uses-vars': 'error', // Enforce usage of React variables in JSX
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve these extensions
        moduleDirectory: ['node_modules', 'src/'], // Look for modules in node_modules and src
      },
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'), // Path to your Webpack config
      },
      typescript: {}, // Resolve TypeScript files
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'], // Use TypeScript parser for .ts and .tsx files
    },
  },
};
