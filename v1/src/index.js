const app = require('./app')

app.listen(process.env.PORT, async (req, res) => {
    console.log(`Server listening on ${process.env.PORT}`)
})