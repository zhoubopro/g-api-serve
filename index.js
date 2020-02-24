/*
 * @Description: 
 * @version: 
 * @Author: zhoubo
 * @Date: 2020-02-24 22:30:46
 * @LastEditors: zhoubo
 * @LastEditTime: 2020-02-25 00:10:07
 * @FilePath: ~@index.js
 */
const express = require('express');

const app = express()

app.get('/', (req, res, next)=> {
  res.send('hello')
})
app.options('/upload', cors())
app.put('/upload', cors(), upload.single('file'), function (req, res, next) {
  res.json({key: req.file.filename})
})
app.get('/upload/:key', cors(), function(req, res, next){
  res.sendFile(`uploads/${req.params.key}`, {
    root: __dirname,
    headers:{
      'Content-Type': 'image/jpeg',
    },
  }, (error)=>{
    if(error){
      res.status(404).send('Not found')
    }
  })
})

var port = process.env.port || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})