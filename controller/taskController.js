const Promise = require('bluebird');
const request = require('request');
const fs = require("fs");

Promise.promisifyAll(request);

const fetchDocument =  async function(req, res) {
    try {
        let result =  await getDocument();
        let writeToStream = await streamWrite(result);
        let count =  await countOccurance(writeToStream.path);
      return res
        .status(200)
        .send(count);
    } catch (err) {
      return res
        .status(500)
        .send(err.message);
    }
  }


  async function getDocument () {
    const options = {
      method: 'GET',
      uri: 'http://norvig.com/big.txt ',
      json: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }
    return request.getAsync(options)
      .then((res) => {
        return res.body;
      })
  }

  async function countOccurance(data) {
    var str =  data;
    var strArray = str.split(' ');
    const newArray = new Set(strArray);
    let map = new Map();
    for (const item of newArray) {
      map.set(item, strArray.filter((element) => element === item).length);
      console.log('mapppppppppp', map);
    }
   return map;
  }

  async function streamWrite(data) {
    let writerStream = fs.createWriteStream(data);  
    writerStream.end();
    writerStream.on('finish', function() {
      console.log("Write completed.");
   });
   
   writerStream.on('error', function(err) {
      console.log(err.stack);
   });
   return writerStream
  }
  module.exports = {
    fetchDocument
  };