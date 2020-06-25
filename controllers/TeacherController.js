
const Teacher = require('../models/teacher');

let getTeachers = (req,res)=>{
    Teacher.find({},(err,teachers)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        if(!teachers){
        res.status(404).send({
            message:'No existen profesores'
        })
        }
        res.status(200).send({teachers})
    })
}

let getTeacher = (req,res)=>{
    let {id} =req.params;
    Teacher.findById(id,(err,teacher)=>{
        if(err){
            res.status(500).json({
                message:`Error al mostrar el profesor`
            })
        }
        if(!teacher){
            res.status(400).json({
                message:'No existe el profesor'
            })
        }
        res.status(200).json({
            teacher
        })
    })
}
let deleteTeacher = (req,res)=>{
    let {id}=req.params; 
    Teacher.findByIdAndDelete(id,(err)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }else{
            res.status(200).json({
                message:`Teacher ${id} delete exit`
            })
        }
    })
}

let updateTeacher = (req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Teacher.findByIdAndUpdate(id,update,{new:true},(err,teacherUpdated)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        res.status(200).json({
            teacher:teacherUpdated
        })
    })
}

module.exports = {
    getTeachers,
    getTeacher,
    deleteTeacher,
    updateTeacher
}