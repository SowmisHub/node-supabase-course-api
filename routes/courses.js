const express = require('express')
const router = express.Router()
const supabase = require('../supabaseClient')
const validateEnrollement = require('../middleware/validateEnrollment')

// ROUTE 1

router.get('/courses', async (req, res) =>{
    const {data, error} =  await supabase
        .from('courses')
        .select('*')
    if(error){
        return res.status(500).json({error: error.message})
    }
    res.json(data)
})

// ROUTE 2

router.post('/enroll', validateEnrollement, async (req, res) =>{
    const {student_name, course_id} = req.body
    const {data, error} = await supabase
        .from('enrollments')
        .insert([
            { student_name, course_id}
        ])
        .select()

    if(error){
        return res.status(500).json({ error: error.message })
    }
    res.json({
        message: "student enrolled successfully",
        enrollemnt: data
    })
})

// ROUTE 3

router.get('/courses/:id/enrollments', async (req, res) =>{
    const courseId = req.params.id
    const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('course_id', courseId)
    if(error){
        return res.status(500).json({ error: error.message })

    }
    res.json(data)
})
module.exports = router