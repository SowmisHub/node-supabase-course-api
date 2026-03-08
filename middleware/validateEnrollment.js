const validateEnrollement = (req, res, next) =>{

    const { studen_name, course_id} = req.body

    if (!student_name || !course_id){
        return res.status(400).json({
            error: "student_name and course_id are required"
        })
    }
    next()
}

module.exports = validateEnrollement