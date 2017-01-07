const exec = require('child_process').exec;
let studentListDataset = require(`../src/student-list.js`)


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


readFiles('../dis')