const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'Verduleria',
    shortName: 'VerCar',
    themeColor: '#0925f1 ',
    msTileColor: '#ff0101',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    startUrl: "./about",
    display: "standalone",
    backgroundColor: "#000000"
  }
})
