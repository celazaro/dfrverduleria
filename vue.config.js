const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'Carlito',
    shortName: 'VerCar',
    themeColor: '#0925f1 ',
    msTileColor: '#ff0101',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    startUrl: ".",
    display: "standalone",
    backgroundColor: "#000000"
  }
})
