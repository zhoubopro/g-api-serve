/*
 * @Description: 
 * @version: 
 * @Author: zhoubo
 * @Date: 2020-02-24 22:30:46
 * @LastEditors: zhoubo
 * @LastEditTime: 2020-02-25 00:22:26
 * @FilePath: ~@index.js
 */
const express = require('express');
const multer  = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })
// const path = require('path')

const app = express()

app.get('/', (req, res, next)=> {
  res.send('hello g-api-serve')
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

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})