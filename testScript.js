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
  const result = [];
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
      ag.assignments.forEach((assignment) => {
        dueDates[assignment.id] = new Date(assignment.due_at).getTime();
      }); //expected output: {1: 1674604800000, 2: 1677456000000, 3: 37454054400000}

      // Process learner submissions
      const learnerResults = [];
      submissions.forEach((sub) => {
        const learnerResult = {
          id: sub.learner_id,
          scores: {},
        };

        const submissionDate = new Date(sub.submission.submitted_at).getTime();
        const dueDate = dueDates[sub.assignment_id];
        // Excluding assignment not yet due from the results and the average.
        if (dueDate <= Date.now()) {
          if (submissionDate > dueDate) {
            // Deduct 10% if submission is late
            learnerResult.scores[sub.assignment_id] =
              Math.max((sub.submission.score - 0.1 *assignmentPoints[sub.assignment_id]),0 ) 
          } else {
            // Include score without deduction
            learnerResult.scores[sub.assignment_id] =
              sub.submission.score 
          }
          learnerResult.total = assignmentPoints[sub.assignment_id];
          learnerResults.push(learnerResult);
        }
      }); //expected learnerResults:
      // [{id: 125 scores: {1: 0.94}}
      //  {id: 125 scores: {2: 1}}
      //  {id: 132 scores: {1: 0.78}}
      //  {id: 132 scores: {2: 0.84}}]

      //Grouping scores by learnerId
      learnerResults.reduce((groupedScors, learner) => {
        const id = learner.id
        if(!groupedScors[id]) {
          groupedScors[id]={id: learner.id, ...learner.scores
        }
      }
      }, {})
      console.log()
      // Calculate weighted averages
      learnerResults.forEach((learnerResult) => {
        const assignmentScores = learnerResult.scores;
        const totalPoints = Object.values(assignmentScores).reduce(
          (total, score) => total + score,
          0
        );
        const weightedAverage =
          (totalPoints * 100) / Object.keys(assignmentScores).length;
        // Push formatted result for each learner
        result.push({
          id: learnerResult.id,
          avg: weightedAverage,
          ...learnerResult.scores, // Include assignment scores
        });
      });
    } else {
      throw "input was invalid: Course information does not match the Assignment group";
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Validation processed!");
  }

  result.reduce((learner, element) => {
    const id = element.learner_id;
    if (learner[id] == null) {
      learner[id] = {
        id: id,
        avg: element.avg
    
      };
    }
    return learnerAverage;
  }, {});


  return result;
}

const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(results);
// The desired result:
// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }
// ];
