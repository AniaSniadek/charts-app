module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    String: {
                        message: 'Use string instead',
                        fixWith: 'string',
                    },
                },
            },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/no-empty-interface': ['error'],
        '@typescript-eslint/no-var-requires': ['error'],
        '@typescript-eslint/prefer-optional-chain': ['error'],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: true,
                arrowParameter: true,
                memberVariableDeclaration: true,
                objectDestructuring: true,
                parameter: true,
                propertyDeclaration: true,
                variableDeclaration: true,
                variableDeclarationIgnoreFunction: true,
            },
        ],
    },
};
