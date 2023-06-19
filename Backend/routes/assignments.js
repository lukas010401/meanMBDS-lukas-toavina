let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignmentsSansPagination(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

// function getAssignments(req, res) {
//     var aggregateQuery = Assignment.aggregate();
    
//     Assignment.aggregatePaginate(aggregateQuery,
//       {
//         page: parseInt(req.query.page) || 1,
//         limit: parseInt(req.query.limit) || 10,
//       },
//       (err, assignments) => {
//         if (err) {
//           res.send(err);
//         }
//         res.send(assignments);
//       }
//     );
//    }

function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();
  
    // Effectuer la jointure avec la collection "students"
    aggregateQuery.lookup({
      from: 'students',
      localField: 'auteur',
      foreignField: '_id',
      as: 'auteurInfo'
    });

    // Effectuer la jointure avec la collection "subjects"
    aggregateQuery.lookup({
        from: 'subjects',
        localField: 'matiere',
        foreignField: '_id',
        as: 'matiereInfo'
    });
  
    Assignment.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          // Récupérer les résultats de l'agrégation
          const assignments = result.docs;
          
          // Mapper les informations sur l'auteur et la matière pour chaque affectation
            const assignmentsWithDetails = result.docs.map((assignment) => {
            // Vérifier si des informations sur l'auteur sont disponibles
            if (assignment.auteurInfo.length > 0) {
            // Récupérer les informations sur l'auteur
            const auteur = assignment.auteurInfo[0];
            assignment.auteurInfo = {
            _id: auteur._id,
            id: auteur.id,
            nom: auteur.nom,
            // Ajouter d'autres propriétés de l'auteur si nécessaire
            };
            } else {
            // Si aucune information sur l'auteur n'est disponible, définir comme null ou une valeur par défaut
            assignment.auteurInfo = null;
            }

            // Vérifier si des informations sur la matière sont disponibles
            if (assignment.matiereInfo.length > 0) {
            // Récupérer les informations sur la matière
            const matiere = assignment.matiereInfo[0];
            assignment.matiereInfo = {
            _id: matiere._id,
            id: matiere.id,
            nom: matiere.nom,
            prof: matiere.prof
            // Ajouter d'autres propriétés de la matière si nécessaire
            };
            } else {
            // Si aucune information sur la matière n'est disponible, définir comme null ou une valeur par défaut
            assignment.matiereInfo = null;
            }

            return assignment;
            });

            // Envoyer les affectations avec les informations sur l'auteur et la matière
            res.send(assignmentsWithDetails);

        }
      }
    );
  }
  
   
// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}
  

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.note = req.body.note;
    assignment.matiere = req.body.matiere_id;
    assignment.auteur = req.body.auteur_id;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.remarque = req.body.remarque;

    console.log(req);
    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: assignment.nom + 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
