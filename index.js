'use strict'


const mongoose=require('mongoose')
const app=require('./app')
const config=require('./config')

mongoose.connect(config.db,(err,res)=>{
	if(err){
		return console.log(`No se pudo conextar a la DB, ${err}`)
	}
	console.log('Conexion a la DB realizada con exito')
	app.listen(config.port,()=>{
		console.log(`API REST http://localhost:${config.port}`)
	})
})

