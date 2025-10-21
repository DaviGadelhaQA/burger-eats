const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://buger-eats-qa.vercel.app',
    specPattern: 'cypress/e2e/**/*.spec.js'
  },
})
