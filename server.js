const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json({extended:false}));
connectDB();
app.get('/',(req, res)=>{
    res.send('api is running');
});


app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))

const port = process.env.port || 5000;
app.listen(port,()=>{
    console.log("server started on "+port)
});