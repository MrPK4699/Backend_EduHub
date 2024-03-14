const express = require('express');
const mongoose = require('mongoose');
const {MongoUrl} = require('./config/config');
const cors= require('cors');

const registerRoutes=require('./Routes/registerRoutes')
const loginRoutes=require('./Routes/loginRoutes')
const discussionRoutes=require('./Routes/discussionRoutes')
const courseRoutes=require('./Routes/courseRoutes')
const lectureRoutes=require('./Routes/lectureRoutes')
const errorHandlers=require('./utils/errorHandlers')

const authenticateToken= require('./Middlewares/authmiddleware')

const app= express();
// console.log(MongoUrl)
mongoose.connect(MongoUrl,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Mongodb is connected');
})
.catch(err=>{console.log(`connection failed : ${err}`)});

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.get('/', (req,res)=>{
    res.json({'msg':'All is Well' })
})

app.use('/auth', authenticateToken);

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/auth/course' ,courseRoutes);
app.use('/auth/lecture' ,lectureRoutes);
app.use('/auth/discussion', discussionRoutes);

app.use(errorHandlers);

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})