# README.md

### How to USE ME

1. In `src/student-list.js`, export all the student repos in an array. 

2. Create a new class-scaffold:
  - `npm run gen-new-class-scaffold`
  - this will populate the submissions directory with folders for each student

3. Clone a repo-assignment for all the students
  - `npm run import-assignment «assignment-name»`
  - This will:
    + clone all the assignments for students who have pushed that assignment to github
    + mark the missing assignments in a CSV	

4. Evaluate student assignments
  - `npm run eval-submissions «student-name»`
  - NOTE: the repo must have an evaluation file `_instructor-evaluation.js`
  ```
  module.exports = { grade: 3, dateGraded: moment("12-25-2016", "MM-DD-YYYY") }
  ```

5. Update a student assignment (fetches the remote repo-assignment for a student)
  - `npm run update-assignment «student-name» «assignment-name»`
	