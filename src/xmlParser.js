const node_xml_stream = require('node-xml-stream');
const fs = require('fs');
const parser = new node_xml_stream();

let expos = { 'expositions': [] };
let _id, expName, expDesc, expStart, expEnd, expoTag;

function parseXML(fileName){
    return new Promise(function(resolve){
        let stream = fs.createReadStream(fileName, 'UTF-8');
        stream.pipe(parser);
        setTimeout(function(){
            resolve(expos);
        }, 5);
    });
}

parser.on('opentag', function(name, attrs) {
    expoTag = name;
});

parser.on('text', function(text) {
    handleTagText(text);
});

parser.on('closetag', function(name) {
    if(name === 'element') {
        expos['expositions']
        .push({ 
            "_id": _id, 
            "expName": expName, 
            "expDesc": expDesc, 
            "expStart": expStart, 
            "expEnd": expEnd 
        });
    }
});

function handleTagText(text) {
    switch(expoTag){
        case "__EQ__oid":
            _id = text;
            break;
        case "expName":
            expName = text;
            break;
        case "expDesc":
            expDesc = text;
            break;
        case "expStart":
            expStart = text;
            break;
        case "expEnd":
            expEnd = text;
            break;
    }
}

module.exports = {
    parseXML
};