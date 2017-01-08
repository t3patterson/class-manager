
let csv = require('csv');
let studentListDataset = require('../src/student-list.js')
let fs = require('fs');
let mkdirp = require('mkdirp')


function arrayToCSVLine(data){
	console.log(data)
	let returnData = data === 'Assignments' ? [data, 'assignment-01'] : [ data,'x']
	return returnData.join(",")+"\n"
}

function writeCSVFile(err, output){
	fs.writeFile(`${__dirname}/../dist/submission-overview.csv`, output.join("") )
}


let csvData = ['Assignments', ...studentListDataset ]
csv.transform(
  csvData,
	arrayToCSVLine,
	writeCSVFile
)

studentListDataset.forEach((githubAcct)=>{
	console.log(githubAcct)
	mkdirp(`${__dirname}/../dist/submissions/${githubAcct}`)
})
