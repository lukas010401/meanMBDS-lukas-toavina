let Student = require('../model/student');

function getStudents(req, res){
    Student.find((err, students) => {
        if(err){
            res.send(err)
        }

        res.send(students);
    });
}

module.exports = { getStudents };

