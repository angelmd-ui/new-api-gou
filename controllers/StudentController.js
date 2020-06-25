const Student = require('../models/student');

let getStudents =(req,res)=>{
    Student.find({},(err,students)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        if(!students){
          res.status(404).send({
              message:'No existen estudiantes'
          })
        }
        res.status(200).send({students})
    })
}
let getStudent = (req,res)=>{
    let {id} =req.params;
    Student.findById(id,(err,student)=>{
        if(err){
            res.status(500).json({
                message:`Error al mostrar el student`
            })
        }
        if(!student){
            res.status(400).json({
                message:'No existe el estudiante'
            })
        }
        res.status(200).json({
            student
        })
    })
}

let deleteStudent =  (req,res)=>{
    let {id}=req.params; 
    Student.findByIdAndDelete(id,(err)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }else{
            res.status(200).json({
                message:`Student ${id} delete exit`
            })
        }
    })
}

let updateStudent = (req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Student.findByIdAndUpdate(id,update,{new:true},(err,studentUpdated)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        res.status(200).json({
            student:studentUpdated
        })
    })
}

module.exports = {
    getStudents,
    getStudent,
    deleteStudent,
    updateStudent
}