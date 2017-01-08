
let csv = require('csv');
let studentListDataset = require('../src/student-list.js')
let fs = require('fs');
let mkdirp = require('mkdirp')



function writeCSVFile(studentGithubList){
	let csvFileContents = [ 'Assignments' , ...studentGithubList].join('\n')
	fs.writeFile(`${__dirname}/../dist/submission-overview.csv`, csvFileContents, {encoding: 'utf-8'} )
}


studentListDataset.forEach((githubAcct)=>{
	console.log(githubAcct)
	mkdirp(`${__dirname}/../dist/submissions/${githubAcct}`)
})

writeCSVFile(studentListDataset)
