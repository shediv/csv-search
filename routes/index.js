var express = require('express');
var router = express.Router();
const csv = require('csvtojson');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', async function(req, res) {
  const csvFilePath='./data.csv';
  const searchText = req.query.text;
  const result = [];
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{

      // Search for searchText in json 
      jsonObj.forEach((obj) => {
        for (const key in obj) {
          let currentKeyValue = obj[key].toString(); 
          if (currentKeyValue.includes(searchText)) result.push(obj)
        }
      })

      return res.status(200).json({count: result.length, data: result});      

    })  
});

module.exports = router;
