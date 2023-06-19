let Student = require('../model/subject');

function getSubjects(req, res){
    Student.find((err, subjects) => {
        if(err){
            res.send(err)
        }

        res.send(subjects);
    });
}

module.exports = { getSubjects };

