'use strict'

const Product=require('../models/product')

function getProducts(req,res){

	Product.find({},(err,products)=>{
		if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
		if(!products) res.status(404).send('No se encontraron productos')

		res.status(200).send({products})
	})
}

function getProduct(req,res){

	let productId=req.params.productId

	Product.findById(productId,(err,product)=>{
		if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
		if(!product) res.status(404).send({message:`No se encontro el producto id ${product}`})

		res.status(200).send({product})
	})
}

function createProduct(req,res){

	let product=new Product()

	product.name=req.body.name
	product.picture=req.body.picture
	product.price=req.body.price
	product.category=req.body.category
	product.description=req.body.description

	product.save((err,productStored)=>{
		if(err) res.status(500).send({message:`Error al guardar el producto ${err}`})

		res.status(200).send({product:productStored})
	})
}

function updateProduct(req,res){

	let productId=req.params.productId
	let update=req.body

	Product.findByIdAndUpdate(productId,update,err=>{
		if(err) res.status(500).send({message:`Error al actualizar el producto ${err}`})

		res.status(200).send({message:"Procuto actualizado con exito"})
	})
}

function deleteProduct(req,res){

	let productId=req.params.productId

	Product.findById(productId,(err,product)=>{
		if(err) res.status(500).send({message:`Error al eliminar el producto ${err}`})
		if(!product){
			res.status(404).send({message:`No se encontro el producto id ${product}`})
		}else{
			product.remove(err=>{
				if(err) res.status(500).send({message:`Error al eliminar el producto ${err}`})
				res.status(200).send({message:"El product ha sido eliminado"})
			})
		}

	})
}

module.exports={
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
}