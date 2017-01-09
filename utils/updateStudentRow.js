const fs = require('fs')

function updateStudentRow(configObj){
	let pathToOverviewCsv = configObj.fileToModify
	let csvData = fs.readFileSync(configObj.fileToModify, 'utf-8')	
	let csvRowsArray = csvData.split('\n')

	let headerRowDataArray = csvRowsArray.shift().split(',')

	// console.log('Assignment Column:', headerRowDataArray.indexOf(configObj.assignmentName) )
	let assignmentColumn = headerRowDataArray.indexOf(configObj.assignmentName)
	// console.log('assignmentColumn: ', assignmentColumn)
	let dataRowsArray = csvRowsArray.map((row)=>{ return row.split(',')})
	console.log(dataRowsArray)
	let studentRowI  
	let studentRow = dataRowsArray.find((row, i)=>{
		 console.log(row[0], '--', configObj.studentGithub)
		 if (row[0] === configObj.studentGithub){
			 studentRowI = i
			 return true
		 }
		 return false
	})
	
	 console.log(studentRow)


	 studentRow[assignmentColumn] = configObj.assignmentScore

	 dataRowsArray[studentRowI] = studentRow
	 let newCsvDataRowsArray = dataRowsArray.map((row)=>{return row.join(',')})
	 let csvHeaderRow = headerRowDataArray.join(',')
	 let newCsvRowsArray = [csvHeaderRow, ...newCsvDataRowsArray]
	 let newCsvData = newCsvRowsArray.join('\n')
	 fs.writeFileSync(configObj.fileToModify, newCsvData, {encoding: 'utf-8'} )		 
}

module.exports = {
	updateStudentRow: updateStudentRow
}

// let optionsObject = {
//  studentGithub : studentDir,
//  assignmentName : assignmentDir,
//  assignmentScore: studentScore,
//  fileToModify: `${process.cwd()}/../../../submission-overview.csv`
// }