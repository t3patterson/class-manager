var fs = require('fs');

let students = [
	'jordanledford',
	'marmstr1123',
	'PaulRSwift'
]

function readFiles(dirname){
	fs.readdir(dirname, function(err, filenames) {
	    if (err) {
	      onError(err);
	      return;
	    }
	    let assignments = filenames.map(function(filename) {
				console.log(parseInt(filename.split('-')[1], 0))
	    }); 
	 });
}


readFiles( process.argv[2], function(name, content){
	process.argv[1]
	console.log(name)
})