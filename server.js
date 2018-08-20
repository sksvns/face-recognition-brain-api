const express =require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const bcrypt =require ('bcrypt-nodejs');
const app=express();


const database={
	users:[
	{
		id:'123',
		name:'john',
		email:'john@gmail.com',
		password:'new',
		entries:0,
		joined: new Date()
	},
	{
		id:'124',
		name:'sally',
        email:'sally@gmail.com',
		password:'new1',
		entries:0,
		joined: new Date()
	}
	]/*,
	login:[
	{
		id:'987',
		hash:'',
		email:'john@gmail.com'
	}
	]*/
}
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{
	if(req.body.email===database.users[0].email&&
		req.body.password===database.users[0].password){
		res.json(database.users[0]);
	}else{
		res.status(400).json('erroe logging in');
	}
})

app.post('/register',(req,res)=>{
	const {email,name,password}=req.body;
	database.users.push({
		id:'125',
		name:name,
        email:email,
		entries:0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})
app.get('/profile/:id',(req,res)=>{
	const {id}=req.params;
	let found=false;
	database.users.forEach(users =>{
		if(users.id === id){
			found=true;
		return 	res.json(users);
		}
	})
	if(!found){
			res.status(404).json('no such user');
		}

})

app.put('/image',(req,res)=>{
	const {id}=req.body;
	let found=false;
	database.users.forEach(users =>{
		if(users.id === id){
			found=true;
			users.entries++
		return 	res.json(users.entries);
		}
	})
	if(!found){
			res.status(404).json('no such user');
		}

})

app.listen(3000);