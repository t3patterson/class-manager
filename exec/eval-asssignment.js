#! /usr/local/bin/node
const fs = require('fs');


function updateStudentRow(studentGithub, assignmentName, assignmentScore){
	let pathToOverviewCsv = `${process.cwd()}/../../../submission-overview.csv`
	let csvData = fs.readFileSync(pathToOverviewCsv, 'utf-8')
	let csvRowsArray = csvData.split('\n')

	let headerRowDataArray = csvRowsArray.shift().split(',')

	console.log('Assignment Column:', headerRowDataArray.indexOf(assignmentName) )
	let assignmentColumn = headerRowDataArray.indexOf(assignmentName)
	console.log('assignmentColumn: ', assignmentColumn)
	let dataRowsArray = csvRowsArray.map((row)=>{ return row.split(',')})

	let studentRowI  
	let studentRow = dataRowsArray.find((row, i)=>{
		 if (row[0] === studentGithub){
			 studentRowI = i
			 return true
		 }
		 return false
	})


	 studentRow[assignmentColumn] = assignmentScore

	 dataRowsArray[studentRowI] = studentRow
	 let newCsvDataRowsArray = dataRowsArray.map((row)=>{return row.join(',')})
	 let csvHeaderRow = headerRowDataArray.join(',')
	 let newCsvRowsArray = [csvHeaderRow, ...newCsvDataRowsArray]
	 let newCsvData = newCsvRowsArray.join('\n')
	 fs.writeFileSync(pathToOverviewCsv, newCsvData, {encoding: 'utf-8'} )	

	 
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
let lastEl = directoryArray.length - 1
let assignmentDir = directoryArray[lastEl]
let studentDir = directoryArray[lastEl - 1]

let studentScore = process.argv[2]
let instructorComment = process.argv[3]

createEvaluation(assignmentDir, studentScore, instructorComment)
updateStudentRow( studentDir , assignmentDir, studentScore)
