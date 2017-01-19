#!/usr/bin/env node

const fs = require('fs');

function updateStudentRow(configObj){
	let pathToOverviewCsv = configObj.fileToModify
	let csvData = fs.readFileSync(configObj.fileToModify, 'utf-8')
	let csvRowsArray = csvData.split('\n')

	let headerRowDataArray = csvRowsArray.shift().split(',')

	// console.log('Assignment Column:', headerRowDataArray.indexOf(configObj.assignmentName) )
	let assignmentColumn = headerRowDataArray.indexOf(configObj.assignmentName)
	// console.log('assignmentColumn: ', assignmentColumn)
	let dataRowsArray = csvRowsArray.map((row)=>{ return row.split(',')})

	let studentRowI  
	let studentRow = dataRowsArray.find((row, i)=>{
		 if (row[0] === configObj.studentGithub){
			 studentRowI = i
			 return true
		 }
		 return false
	})


	 studentRow[assignmentColumn] = configObj	.assignmentScore

	 dataRowsArray[studentRowI] = studentRow
	 let newCsvDataRowsArray = dataRowsArray.map((row)=>{return row.join(',')})
	 let csvHeaderRow = headerRowDataArray.join(',')
	 let newCsvRowsArray = [csvHeaderRow, ...newCsvDataRowsArray]
	 let newCsvData = newCsvRowsArray.join('\n')
	 fs.writeFileSync(configObj.fileToModify, newCsvData, {encoding: 'utf-8'} )		 
}

function createEvaluation(currentDir, firstCliArg, secondCliArg){
	
	if(!~currentDir.indexOf('assignment-')){
		console.log('You must be in a student directory with /path/to/«student»/assignment-«XX»')
		process.exit()
	} 

	if(!firstCliArg || parseInt(firstCliArg, 10) < 0 || parseInt(firstCliArg,10) > 4 ){
		console.log('must receive an argument for a score between 1-4')
		process.exit()
	} 

	let scoreRow = `score,${firstCliArg}`
	let timeStampRow = `date,${Date.now()}`
	let commentRow = `comment,"${secondCliArg || "no-comment"}"`

	let csvData = [scoreRow,timeStampRow,commentRow].join('\n')


	fs.writeFileSync('_instructor-eval.csv', csvData)
}


let directoryArray = process.cwd().split('/')
let studentScore = process.argv[2]
let instructorComment = process.argv[3]

let assignmentDir = directoryArray.pop()
let studentDir = directoryArray.pop()

let optionsObject = {
 studentGithub : studentDir,
 assignmentName : assignmentDir,
 assignmentScore: studentScore,
 fileToModify: `${process.cwd()}/../../../submission-overview.csv`
}

createEvaluation(assignmentDir, studentScore, instructorComment)
updateStudentRow( optionsObject )
