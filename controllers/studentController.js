'use strict';
const firebase = require('../db');
const Student = require('../models/student');
const firestore =  firebase.firestore();

const addStudent =  async (req,res,next)=>{
    try{
        const data = req.body;
        await firestore.collection('students').doc().set(data);
        res.status(200).send('Record saved successfuly');
    }catch (error){
        res.status(400).send(error.message);
    }
}



const getAllStudents =  async (req,res,next)=>{
    try{

        const  students =  await firestore.collection('students');
        const  data = await students.get();
        const studentsArray = [];



        if (data.empty){
            res.status(400).send("No such record found");
        }else {


            data.forEach(doc => {
                const student = new Student(
                        doc.id,
                        doc.data().firstName,
                        doc.data().lastName,
                        doc.data().fartherName,
                        doc.data().age,
                        doc.data().semester,
                        doc.data().classEnrolled,
                        doc.data().status,
                        doc.data().year,
                        doc.data().subject,
                        doc.data().phoneNumber,
                    );
                    studentsArray.push(student);
            });


            res.status(200).send(studentsArray);

        }
        res.status(200).send('Record saved successfuly');
    }catch (error){
        res.status(400).send(error.message);
    }
}


const getStudent =  async (req,res,next)=>{
    try{

        const id = req.params.id;
        const  student =  await firestore.collection('students').doc(id);
        const  data = await student.get();


        if (!data.exists){
            res.status(404).send("Student with given ID not found");
        }else {

            res.status(200).send(data.data());

        }
        res.status(200).send('Record saved successfuly');
    }catch (error){
        res.status(400).send(error.message);
    }
}


const updateStudent =  async (req,res,next)=>{
    try{

        const id = req.params.id;
        const data = req.body;
        const  student =  await firestore.collection('students').doc(id);
        await student.update(data);
        res.status(200).send("Student record updated successfuly");

    }catch (error){
        res.status(400).send(error.message);
    }
}


const deleteStudent =  async (req,res,next)=>{
    try{

        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.status(200).send("record deleted successfuly");

    }catch (error){
        res.status(400).send(error.message);
    }
}



module.exports={
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}
