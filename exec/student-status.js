const fs = require('fs');
const studentList = require('../src/student-list.js')
const {updateStudentRow} = require('../utils/updateStudentRow.js')

function checkStudentScores(studentSubmissionsDir, studentGithubName){
	let fileNames = fs.readdirSync(studentSubmissionsDir)
	console.log(fileNames)
	fileNames.forEach((repoDirectory)=>{
		if(fs.existsSync(`${studentSubmissionsDir}/${repoDirectory}/_instructor-eval.csv`)){
			let csvData = fs.readFileSync(`${studentSubmissionsDir}/${repoDirectory}/_instructor-eval.csv`, 'utf-8')
			let gradeRow = csvData.split('\n')[0]
			let gradeCells = gradeRow.split(',')
			
			updateStudentRow({
				 fileToModify: `${__dirname}/../dist/submission-overview.csv`,
				 studentGithub : studentGithubName,
				 assignmentName : repoDirectory,
				 assignmentScore: gradeCells[1],			
			})
			
			return
		}
		
		console.log('x')
		// 	let submittedAssignments = filenames
		// 
		// let alreadyImportedList = csvData.replace(/[\r\n]/g, "").split(',')
		// 
		// console.log(submittedAssignments	)
		// console.log(alreadyImportedList)
		// 
		// let studentPerf = alreadyImportedList.map((assignmentName	)=>{
		// 	console.log(assignmentName)
		// 	if( ~submittedAssignments.indexOf(assignmentName) ){
		// 		return '√'
		// 	} else {
		// 		return 'x'
		// 	}
		// })
	
	})
}


studentList.forEach((student)=>{
	console.log(student)
	checkStudentScores(`${__dirname}/../dist/submissions/${student}`, student)
})
