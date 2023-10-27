const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");


module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        const width = 1920
        const height = 1080
            
        if (browser.name === 'electron') {
          launchOptions.preferences.width = width
          launchOptions.preferences.height = height
        }
      
        if (browser.name === 'firefox') {
          launchOptions.args.push(`--width=${width}`);
          launchOptions.args.push(`--height=${height}`); 
        }

        if (browser.name === 'chrome') {   
          launchOptions.args.push('--start-maximized');   
          launchOptions.args.push(`--window-size=${width},${height}`);   
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--disable-site-isolation-trials');
          launchOptions.args.push('--disable-dev-shm-usage');   
          launchOptions.args.push('--ignore-certificate-errors');
          launchOptions.args.push('--disable-gpu');      
          //launchOptions.args.push('--force-device-scale-factor=1');
          launchOptions.preferences.fullscreen = true
          launchOptions.preferences.incognito = true      
        } 

        return launchOptions
      });
      
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      
      allureWriter(on, config);

      return config;
    },

    specPattern: ["cypress/*/features/*/*.feature","cypress/*/features/*.feature"],
    chromeWebSecurity: false,
    baseUrl: "https://www.saucedemo.com",
    env: {
      allureReuseAfterSpec: true,
    },
    defaultCommandTimeout: 60000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
        
  },
  
});