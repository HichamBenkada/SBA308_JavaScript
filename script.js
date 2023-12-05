// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  let result; //function_output
  try {
    //if true: Run the function
    if (course.id === ag.course_id) {
      // Create an object to store assignments' points_possible
      const assignmentPoints = {};
      ag.assignments.forEach((assignment) => {
        assignmentPoints[assignment.id] = assignment.points_possible;
      }); // expected output {1: 50, 2: 150, 3: 500}

      // Create an object to store assignments due dates:
      const dueDates = {};
      for (assignment of ag.assignments) {
        dueDates[assignment.id] = new Date(assignment.due_at).getTime();
      } //expected output: {1: 1674604800000, 2: 1677456000000, 3: 37454054400000}
      /**Returns the number of milliseconds elapsed since the midnight at the beginning of January 1, 1970
        UTC.*/

      // Process learner submissions
      const learnerResults = [];
      submissions.forEach((sub) => {
        const learnerResult = {
          id: sub.learner_id,
          scores: {},
        };

        const submissionDate = new Date(sub.submission.submitted_at).getTime();
        const dueDate = dueDates[sub.assignment_id];
        
        // A boolean to check if an assignment passed due
        const isLate = submissionDate > dueDate;
        //a boolean to filter out assignmnets not due yet
        const isAlreadyDue = dueDate <= Date.now();

        // Excluding assignment not yet due from the results and the averAssignmentGroupe.
        if (isAlreadyDue) {
          if (isLate) {
            // Deduct 10% if submission is late
            learnerResult.scores[sub.assignment_id] =
              Math.max(sub.submission.score -
                  0.1 * assignmentPoints[sub.assignment_id], 0) / assignmentPoints[sub.assignment_id];
            learnerResult[sub.assignment_id] = Math.max(
              sub.submission.score - 0.1 * assignmentPoints[sub.assignment_id],
              0
            );
          } else {
            // Include score without deduction
            learnerResult.scores[sub.assignment_id] =
              sub.submission.score / assignmentPoints[sub.assignment_id];
            learnerResult[sub.assignment_id] = sub.submission.score;
          }
          learnerResult.total = assignmentPoints[sub.assignment_id];
          learnerResults.push(learnerResult);
        }
      }); //expected learnerResults:
      // [{1: 47, id: 125, scores:{1:47/50}, total: 50}
      //  {2: 150, id: 125, scores:{1:150/150}, total: 150}
      //  {1: 39, id: 132, scores:{1:39/50}, total: 50}
      //  {2: 125, id: 132, scores:{1:125/50}, total: 150}]

      // console.log(learnerResults); // LearnerResults is checked

      const formattedResults = {};

      // Iterating through the data array
      learnerResults.forEach((obj) => {
        const { id } = obj;
        const scoreKey = Object.keys(obj).find(
          (key) => typeof obj[key] === "number"
        ); // Get the key containing the score
        const score = obj[scoreKey]; // Get the score value

        if (!formattedResults[id]) {
          formattedResults[id] = { id, avg: 0, totalScore: 0, total: 0 }; // Initialize for the Learner results object if it doesn't exist
        }
        const percentScore = score / obj.total;
        formattedResults[id][scoreKey] = Number(percentScore.toFixed(2)); // Set the score as "score/total"
        formattedResults[id].totalScore += score;
        formattedResults[id].total += obj.total; // Accumulate the total

        //Computing the weighted average score
        formattedResults[id].avg =
          formattedResults[id].totalScore / formattedResults[id].total;
      });
      const output = Object.values(formattedResults); //function_output with desired results
      //console.log(output);//passed testing result and the expected results:
      // [{1: 0.94, 2: 1, id: 125, avg: 0.985, totalScore: 197, total: 200},
      //  {1: 0.78, 2: 0.83, id: 132, avg: 0.82, totalScore: 164, total: 200}]

      result = [...output];
      result.forEach((item) => {
        delete item.total;
        delete item.totalScore;
      });
    } else {
      throw "input was invalid: Course information does not match the Assignment group";
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Validation is processed successfully!");
  }

  return result;
}

const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(results);
