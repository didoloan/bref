const mongoose = require('mongoose');
const server = require('./server')

mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useCreateIndex:true, 
    useFindAndModify:false});

mongoose.connection.on('connecting', () => {
    console.log('Initiating Database Connection........');
})

mongoose.connection.on('connected', () => {
    server.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`)
    })
})


process.on('SIGINT', async () => {
    await server.close()
    await mongoose.connection.close()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    await server.close()
    await mongoose.connection.close()
    process.exit(0)
})