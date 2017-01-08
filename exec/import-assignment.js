const exec = require('child_process').exec;
const fs = require('fs')

let studentListDataset = require(`../src/student-list.js`)

function cloneRepos(studentList, assignmentName){
	studentList.forEach((student)=>{
		exec(`git clone https://github.com/${student}/${assignmentName}.git ${__dirname}/../dist/submissions/${student}/${assignmentName}`, (err, stdout, stderr)=>{

			if (err) {
		    console.error(`exec error: ${err}`);
		    return;
		  }
		  console.log(`stdout: ${stdout}`);
  		console.log(`stderr: ${stderr}`);
		})
	})
}


function markAsImported(assignmentName){
	fs.readFile(`${__dirname}/../dist/submission-overview.csv`, 'utf-8', function(err, fileContents){

		let submissionList = (fileContents.split(','))
		if(~submissionList.indexOf(assignmentName)){
			console.log(`'${assignmentName}' is already on the list`)
		} else {
			fs.writeFile(`${__dirname}/../dist/submission-overview.csv`, [...submissionList, assignmentName].join(','))
		}
	})

}

let assignmentArg = process.argv[2]
cloneRepos(studentListDataset, assignmentArg)
markAsImported(assignmentArg)
