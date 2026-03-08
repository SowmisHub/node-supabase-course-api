const logger = ( req, res, next) =>{
    
    console.log(`Request: ${req.method} ${req.originallyUrl}`)
    next()
}

module.exports = logger