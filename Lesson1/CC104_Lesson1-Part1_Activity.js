let student_scores = [78, 95, 74, 80, 87];

console.log("Student scores: ");

for (let i = 0; i < student_scores.length; i++) {
    console.log(student_scores[i]);
}

console.log();

let highest = student_scores[0];
let lowest = student_scores[0];
let passed = 0;
let failed = 0;

for (let i = 0; i < student_scores.length; i++) {

    let scores = student_scores[i];
    let grade;

    if (scores > highest) {
        highest = scores;
    }

    if (scores < lowest) {
        lowest = scores;
    }

    if (scores >= 90) {
        grade = "Excellent";
    }

    else if (scores >= 80) {
        grade = "Very Good";
    } else {
        grade = "Good";
    } 

    if (scores >= 75) {
        passed++;
        console.log("Student " + (i + 1) + ": " + scores + " - " + grade + " - " + "Passed")
    } else {
        failed++;
        console.log("Student " + (i + 1) + ": " + scores + " - " + "Failed")
    }

}

console.log();

let total = 0

for (let i = 0; i < student_scores.length; i++) {

    total += student_scores[i]; 

}

let ave = 0
ave = total / student_scores.length;

console.log("Total Score: " + total);  
console.log("Average Score: " + ave);

console.log("Highest Score: " + highest);
console.log("Lowest Score: " + lowest);
console.log("Passed: " + passed);s
console.log("Failed: " + failed);