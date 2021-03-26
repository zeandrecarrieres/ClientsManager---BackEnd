const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
require('./models/Model_client')
const Model_client = mongoose.model('model_client')

const app = express()

app.use(express.json())

app.use(cors())
// app.use((req, res, next)=>{
// 	res.header("Access-Control-Allow-Origin", "*")
// 	res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE')
// 	res.header('Access-Control-Allow-Headers', "X-PINGOTHER, Content-Type, Authorization");
// 	app.use(cors())
// 	next()
// })

mongoose.connect('mongodb://localhost/cadcli', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database connected')
}).catch((error)=>{
    console.log(error)
})

app.get('/', function(req, res){
    res.send('servidor funcionando!')
})


//Rota criar cliente
app.post("/model_client", (req, res, next) => {
	const model_client = Model_client.create(req.body, (error) => {
		if(error) return console.log(error)
			return res.status(200).json({
			error: false,
			message: "Saved!"
		})
	})
})

//Rota listar clientes
app.get("/model_client", (req, res) => {
	Model_client.find().then((model_client) => {
			return res.status(200).json(model_client)
	}).catch((error)=>{
        return res.status(400).json({
            error: true,
            message: "registry not found!"
        })
    })
})

//Rota atualizar cliente
app.put('/model_client/:id', (req, res)=>{
    const model_client = Model_client.updateOne({_id: req.params.id}, req.body, (error)=>{
        if(error) return res.status(400).json({
            error: true,
            message: "Error: Document not updated! Try again!"
        })
        return res.json({
            error: false,
            message: "Sucess! Document updated!"
        })
    })
})

//Rota deletar cliente
app.delete("/model_client/:id", (req, res)=>{
	const model_client = Model_client.deleteOne({_id: req.params.id}, (error)=>{
		if(error) return res.status(400).json({
			error:true,
			message: "Error: Registry is not deleted!"
			})
		return res.json({
			error: true,
			message: "Deleted!"
		})
	})
})


app.listen(3001)