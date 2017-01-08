const fs = require('fs');
const studentList = require('../src/student-list.js')

function checkStudentScores(studentSubmissionsDir){
	fs.readdir(studentSubmissionsDir, function(err, filenames) {
	    if (err) {
	      console.log(err);
	      return;
	    }

			let csvData = fs.readFileSync(`${__dirname}/../dist/submission-overview.csv`, 'utf-8')
	    let submittedAssignments = filenames

			let alreadyImportedList = csvData.replace(/[\r\n]/g, "").split(',')

			console.log(submittedAssignments	)
			console.log(alreadyImportedList)

			let studentPerf = alreadyImportedList.map((assignmentName	)=>{
				console.log(assignmentName)
				if( ~submittedAssignments.indexOf(assignmentName) ){
					return '√'
				} else {
					return 'x'
				}
			})

			console.log(studentPerf)
	 });
}


studentList.forEach((student)=>{
	checkStudentScores(`${__dirname}/../dist/submissions/${student}`)
})
