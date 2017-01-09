const exec = require('child_process').exec;
const fs = require('fs')
const {githubApiKey} = require('../secrets.js')

let studentListDataset = require(`../src/student-list.js`)

function cloneRepos(studentList, assignmentName){
	
	studentList.forEach((studentGithub)=>{
		exec(`curl https://api.github.com/repos/${studentGithub}/${assignmentName}?access_token=${githubApiKey}`, (err, stdout, stderr)=>{
		
		
		  if (err) {
		    console.error(`exec error: ${err}`);
		    return;
		  }
		  
		  let csvData = fs.readFileSync(`${__dirname}/../dist/submission-overview.csv`, 'utf-8')
		  let csvRowsArray = csvData.split('\n')
		  
		  let headerRowDataArray = csvRowsArray.shift().split(',')
		  
		//   console.log('Assignment Column:', headerRowDataArray.indexOf(assignmentName) )
		  let assignmentColumn = headerRowDataArray.indexOf(assignmentName)
		//   console.log('assignmentColumn: ', assignmentColumn)
		  let dataRowsArray = csvRowsArray.map((row)=>{ return row.split(',')})
		  
		  let studentRowI  
		  let studentRow = dataRowsArray.find((row, i)=>{
				if (row[0] === studentGithub){
					studentRowI = i
					return true
				}
				return false
		 })
		

		  if( ~stdout.indexOf('owner') && ~stdout.indexOf('full_name') && isNaN(studentRow[assignmentColumn]) ){
				console.log(`${studentGithub} - ${assignmentName} - YES FOUND`);
				studentRow[assignmentColumn] = '+'
				exec(
					`git clone https://github.com/${studentGithub}/${assignmentName}.git ${__dirname}/../dist/submissions/${studentGithub}/${assignmentName}`, 
					(err, stdout, stderr)=>{}
				)
		  } else { 
				console.log(`${studentGithub} - ${assignmentName} - NOT FOUND`);
			};

			dataRowsArray[studentRowI] = studentRow
		   let newCsvDataRowsArray = dataRowsArray.map((row)=>{return row.join(',')})
			let csvHeaderRow = headerRowDataArray.join(',')
			let newCsvRowsArray = [csvHeaderRow, ...newCsvDataRowsArray]
			let newCsvData = newCsvRowsArray.join('\n')
			
			fs.writeFileSync(`${__dirname}/../dist/submission-overview.csv`, newCsvData, {encoding: 'utf-8'} )	
			
		})
	})
		
}


function markAssignmentAsImported(assignmentName){
	let fileContents = fs.readFileSync(`${__dirname}/../dist/submission-overview.csv`, 'utf-8')
	let rows = (fileContents.split('\n'))
	let headerRow = rows.shift()
	let headerRowFields = headerRow.split(',')
	
	if(~headerRow.indexOf(assignmentName)){
		console.log(`'${assignmentName}' is already on the list`)
	} else {
		let newHeaderRow = [...headerRowFields, assignmentName].join(',')
		
		console.log(rows)
		let dataRowFields = rows.map((r)=>{ 
			let rowArr = r.split(',')
			rowArr.push('-')
			return rowArr.join(',')
		})
	
		let csvData = [newHeaderRow, ...dataRowFields].join("\n")
		fs.writeFileSync(`${__dirname}/../dist/submission-overview.csv`, csvData)
	}
}

let assignmentArg = process.argv[2]
markAssignmentAsImported(assignmentArg)
cloneRepos(studentListDataset, assignmentArg)
