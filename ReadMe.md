# SBA 308: JavaScript Fundamentals
github link:
todays date: 12/5/2023

## Introduction
This Mudual Complession Project assessment is to size my understanding of fundamental JavaScript concepts and my ability to apply these concepts in a practical manner. 

#### Skill Base Assissment includes:
Employ basic JavaScript syntax accurately.
Implement control flow structures such as conditionals and loops effectively.
Use arrays and objects to organize and manage data.
Develop functions to create reusable code.
Utilize loops and iteration to navigate through data collections.
Implement error handling to manage potential code failures gracefully.

## Objectives
The main goal is to analyze and transform provided data by
creating a script that gathers data, processes it, and then outputs a consistent result.
(hint:Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result)

#### The desired result: 
//-------- An array of objects -------------
  // [
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

#### The data provided
A CourseInfo object, which looks like this:
{
  "id": number, 
  "name": string,
}

An AssignmentGroup object, which looks like this:
{
  "id": number, 
  "name": string, 
  // the ID of the course the assignment group belongs to
  "course_id": number, 
  // the percentage weight of the entire assignment group
  "group_weight": number,
  //array of AssinmentInfo object 
  "assignments": [AssignmentInfo], 
}

Each AssignmentInfo object within the assignments array looks like this:
{
  "id": number,
  "name": string,
  // the due date for the assignment
  "due_at": Date string,
  // the maximum points possible for the assignment
  "points_possible": number,
}

An array of LearnerSubmission objects, which each look like this:
{
    "learner_id": number,
    "assignment_id": number,
    "submission": {
      "submitted_at": Date string,
      "score": number
    }
}


# My Code Discreption:

- Used try/catch to handle consistancy of inputs; AssignmentGroup does belong to its course (mismatching course_id), and throw an error, letting the user know that the input was invalid. 

- result: array Output.

- assignmentPoints: object of the assignments possible points

- dueDates: object of assignments due dates

- LearnerResults: array of learner submission summary 

- isLate a boolean to check late assignment

- Iterate through the learner submissions and calculate the score based on the logic "isLate" and append "LearnerResults". Also includes data verification and validations throughout the code conditionals to prevent potential errors within the input data. What if points_possible is 0? You cannot divide by zero. 

- Considere "What if" a value that you are expecting to be a number is instead a string? 

- If an assignment is not yet due, not to be included in the results or the average computation. 

- Deducting 10 percent of the total points possible from their score for that assignment if submission is late.

-LearnerResults iteration to create the desired output formate
- Final result is tested to be working acuratly 
##### Thank you for your time if you leave me feedback to make my coding better