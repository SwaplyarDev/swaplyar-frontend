module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 120], // Máximo de 120 caracteres
    'header-min-length': [2, 'always', 10], // Mínimo de 10 caracteres
  },
};