class Student {
    constructor(name, scores) {
        this.name = name;
        this.scores = scores;
    }

    getAverage() {
        let sum = 0;
        for (let i = 0; i < this.scores.length; i++) {
            sum += this.scores[i];
        }
        return sum / this.scores.length;
    }

    getLetterGrade() {
        let average = this.getAverage();

        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else {
            return "F";
        }
    }
}

function analyzeClass(students) {
    console.log("------- STUDENT REPORT -------");

    let classTotal = 0;
    let topStudentName = "";
    let topStudentAverage = 0;

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        let average = student.getAverage();
        let letterGrade = student.getLetterGrade();

        console.log(`${student.name} - Average: ${average.toFixed(1)} | Grade: ${letterGrade}`);

        classTotal += average;

        if (average > topStudentAverage) {
            topStudentAverage = average;
            topStudentName = student.name;
        }
    }

    let classAverage = classTotal / students.length;

    console.log("-----------------------------------");
    console.log(`Class Average: ${classAverage.toFixed(1)}`);
    console.log(`Top Student: ${topStudentName} with ${topStudentAverage.toFixed(1)}`);
}

const studentData = [
    { name: "Lany", scores: [85, 90, 92] },
    { name: "Bongbung", scores: [70, 75, 68] },
    { name: "Dutherthe", scores: [95, 98, 92] },
    { name: "Pico", scores: [55, 60, 58] }
];

const students = studentData.map(data => new Student(data.name, data.scores));

analyzeClass(students);
