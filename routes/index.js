'use strict'

const express=require('express')
const productCtr=require('../controllers/product')
const userCtr=require('../controllers/user')
const auth=require('../middlewares/auth')

const api=express.Router()


api.get('/product',productCtr.getProducts)
api.get('/product/:productId',productCtr.getProduct)
api.post('/product',productCtr.createProduct)
api.put('/product/:productId',productCtr.updateProduct)
api.delete('/product/:productId',productCtr.deleteProduct)

api.post('/signup',userCtr.signUp)
api.post('/signin',userCtr.signIn)

api.get('/private',auth,function(req,res){
	res.status(200).send({message:'Bienvenido'})
})

module.exports=api