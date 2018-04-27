const express = require('express')
const app = express()

app.use(express.static('build'))

app.get('*',(req,res) => res.sendFile(__dirname + '/build/index.html'));

app.listen(process.env.PORT, function () {
	console.log('Listening on port 3000!')
})
