'use strict'

const service=require('../services')

function isAuth(req,res,next){
	if(!req.headers.authorization){
		return res.status(403).send({message:'No tienes autorización'})
	}

	const token=req.headers.authorization.split(" ")[1]

	service.decodeToken(token)
		.then(response=>{
			console.log(response)
			req.user=response
			next()
		})
		.catch(response=>{
			res.status(response.status).send(response.message)
		})

}

module.exports=isAuth