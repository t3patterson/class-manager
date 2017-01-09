# README.md

### How to USE ME

1. In `src/student-list.js`, export all the student repos in an array. 

2. `npm install` will create a post-install hook executable that allows you to run the command line operation: `eval-assignment`

3. Create a new class-scaffold:
  - `npm run gen-new-class-scaffold`
  - this will populate the submissions directory with folders for each student

4. Clone a repo-assignment for all the students
  - `npm run import-assignment «assignment-name»`
  - NOTE: all assignments must be formatted: *assignment-xx*
  - This will:
    + clone all the assignments for students who have pushed that assignment to github
    + mark the missing assignments in a CSV	

5. Evaluate a single assignment.
  - **you must navigate to the student's assignment directory** -- i.e. the assignment-repo folder where the repo has been cloned
    - e.g. `$ cd /dist/submissions/«student-name»/assignment-01`
  - `eval-assignment «student-score» "«comment»"`
  - NOTE: the repo will have an evaluation file `_instructor-evaluation.js`
  ```
  score,4
  date,1483928846944
  comment,"excellent workls"
  ```
  - it will output the grade to `/dist/submissions-overview.csv`

6. Evaluate all 
  - `$ npm run eval-all-students`
  - will sweep through `dist/submissions/` to see what the students' scores are for the assignments that have been graded