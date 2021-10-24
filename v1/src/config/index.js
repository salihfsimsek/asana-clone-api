//Konfigurasyonlarin server ile beraber ayni anda ayaklanmasi icin tek bir yerden yonetilmesi gerekir.
const server = require('./server')

module.exports = () => {
    server()
}