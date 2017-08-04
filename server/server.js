var express     = require('express');
var mongodb     = require('mongodb');
var bodyParser  = require('body-parser');
const app       = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API' });
});
app.use('/api', router);
app.listen(port);

var reads = [{
    "readName": "GGGATCGATAGAATGGCCACGACGGGAGGTGGCCCGAGAGTAAACGTTTGCCAAGGCAAGAAGATATTTTGCGTGGAAAAAAATAGATTATTCTGACGTGTTCTCGCCATAAGCCATGGGGCCACTCAGTATAAGTCGTTAGGTTACACC",
},{
    "readName": "SuGGCAAGCTGCAGGTAGCTCATAGCACGATAGAATAGTCTTACGACCAGATTTTTTAGGAGGGAAGCGCGGTCGCACACCCTGAGTCAAGGCGAGCCTGGAACCATGAATCGCACGCCCAACTACGAGCCGACAAGCCCACGACAATGTAAds1",
},{
    "readName": "GAATCAGACAGTCCCCCGACCTAAAACAGATGACATCGCCTTATTCGGAGCCAAACACCCTCTTGGTTGGCAAGGCATCACTTTGTCCTGATATCCCTCAGAGCCGTGAATGTAGACACGCGCTGATCCCGGACGTCAGTGGGGGCGGGG",
}];

app.get('/api/getReads', function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(reads);
});

app.post('/api/postReads', function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    reads = req.body.reads;
    res.json(reads);
});