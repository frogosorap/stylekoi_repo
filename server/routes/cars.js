const router = require(`express`).Router()
var createError = require('http-errors')

const carsModel = require(`../models/cars`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})


const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            return next(err)
        }

        req.decodedToken = decodedToken
        return next()
    })
}


const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {    
        return next()
    }
    else
    {
        return next(createError(401))
    }
}


const createNewCarDocument = (req, res, next) => 
{           
    // Use the new car details to create a new car document                
    let carDetails = new Object()
                
    carDetails.name = req.body.name
    carDetails.colour = req.body.colour
    carDetails.year = req.body.year
    carDetails.price = req.body.price
    carDetails.size = req.body.size
    carDetails.gender = req.body.gender
    carDetails.fabric= req.body.fabric
    carDetails.description = req.body.description

    // add the car's photos to the carDetails JSON object
    carDetails.photos = []
                
    req.files.map((file, index) =>
    {
        carDetails.photos[index] = {filename:`${file.filename}`}
    })
        
    carsModel.create(carDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        return res.json(data)        
    })
}


const getAllCarDocuments = (req, res, next) => 
{   
    
    //user does not have to be logged in to see car details
    carsModel.find((err, data) => 
    {       
        if(err)
        {
            return next(err)
        }     
        return res.json(data)
    })
}


const getCarPhotoAsBase64 = (req, res, next) => 
{   
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => 
    {     
        if(err)
        {
            return next(err)
        }  
        
        if(fileData)
        {  
            return res.json({image:fileData})                           
        }   
        else
        {
            return res.json({image:null})
        }
    })             
}


const getCarDocument = (req, res, next) => 
{
    carsModel.findById(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })
}


const updateCarDocument = (req, res, next) => 
{
    carsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}


const deleteCarDocument = (req, res, next) => 
{
    carsModel.findByIdAndRemove(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })      
}


// read all records
router.get(`/cars`, getAllCarDocuments)

// get one car photo
router.get(`/cars/photo/:filename`, getCarPhotoAsBase64)

// Read one record
router.get(`/cars/:id`, verifyUsersJWTPassword, getCarDocument)

// Add new record
router.post(`/cars`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("carPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewCarDocument)

// Update one record
router.put(`/cars/:id`, verifyUsersJWTPassword, updateCarDocument)

// Delete one record
router.delete(`/cars/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deleteCarDocument)


module.exports = router