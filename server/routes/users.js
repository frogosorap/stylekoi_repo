const router = require(`express`).Router()
var createError = require('http-errors')

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs')  // needed for password encryption

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

const emptyFolder = require('empty-folder')



const checkThatUserExistsInUsersCollection = (req, res, next) =>
{
    usersModel.findOne({email:req.params.email}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }        

        req.data = data            
        return next()        
    })    
}


const checkThatJWTPasswordIsValid = (req, res, next) =>
{    
    bcrypt.compare(req.params.password, req.data.password, (err, result) =>
    {        
        if(err)
        {
            return next(err)
        }
        
        if(!result)
        {  
          return next(createError(401))
        }        
        
        return next()        
    })
}


const checkThatFileIsUploaded = (req, res, next) =>
{
    if(!req.file)
    {
        return next(createError(400, `No file was selected to be uploaded`))
    }
    
    return next()
}


const checkThatFileIsAnImageFile = (req, res, next) =>
{
    if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (err) => {return next(err)})                
    }
    
    return next()
}


const checkThatUserIsNotAlreadyInUsersCollection = (req, res, next) =>
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email:req.params.email}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        if(data)
        {
            return next(createError(401))
        }
    })
    
    return next()
}


const addNewUserToUsersCollection = (req, res, next) =>
{
    bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
    {
        if(err)
        {
            return next(err)
        }
        
        usersModel.create({name:req.params.name, email:req.params.email, password:hash, profilePhotoFilename:req.file.filename}, (err, data) => 
        {
            if(err)
            {
                return next(err)
            }
            
            const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})     
                           
            fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, 'base64', (err, fileData) => 
            {
                if(err)
                {
                    return next(err)
                }
                    
                return res.json({name: data.name, accessLevel:data.accessLevel, profilePhoto:fileData, token:token})
            })
        }) 
    })     
}


const emptyUsersCollection = (req, res, next) =>
{
    usersModel.deleteMany({}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        if(!data)
        {
            return next(createError(409,`Failed to empty users collection`))
        }
    })
    
    return next()
}


const addAdminUserToUsersCollection = (req, res, next) =>
{
    const adminPassword = `123!"£qweQWE`
    bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
    {
        if(err)
        {
            return next(err)
        }
        
        usersModel.create({name:"Administrator",email:"admin@admin.com",password:hash,accessLevel:parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (err, data) => 
        {
            if(err)
            {
                return next(err)
            }
            
            if(!data)
            {    
                return next(createError(409,`Failed to create Admin user for testing purposes`))
            }
            
            emptyFolder(process.env.UPLOADED_FILES_FOLDER, false, (result) =>
            {
                return res.json(data)
            })               
        })
    })
}


const returnUsersDetailsAsJSON = (req, res, next) =>
{
    const token = jwt.sign({email: req.data.email, accessLevel:req.data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})     

    if(req.data.profilePhotoFilename)
    {
        fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.data.profilePhotoFilename}`, 'base64', (err, data) => 
        {        
            if(err)
            {
                return next(err)
            }
        
            if(data)
            {  
                return res.json({name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:data, token:token})                           
            }   
            else
            {
                return res.json({name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:null, token:token})  
            }
        })     
    }
    else
    {
        return res.json({name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:null, token:token})  
    }    
}


const getAllUserDocuments = (req, res, next) => 
{   
    
    //user does not have to be logged in to see car details
    usersModel.find((err, data) => 
    {       
        if(err)
        {
            return next(err)
        }     
        return res.json(data)
    })
}


const deleteUser = (req, res, next) => {
    const userId = req.params.id;

    usersModel.findByIdAndDelete(userId, (err, data) => {
        if (err) {
            return next(err);
        }

        if (!data) {
            return next(createError(404, `User not found`));
        }

        return res.json({ message: `User with ID ${userId} has been deleted successfully` });
    });
};


const logout = (req, res, next) => 
{       
    return res.json({})
}


// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 
router.post(`/users/reset_user_collection`, emptyUsersCollection, addAdminUserToUsersCollection)

router.post(`/users/register/:name/:email/:password`, upload.single("profilePhoto"), checkThatFileIsUploaded, checkThatFileIsAnImageFile, checkThatUserIsNotAlreadyInUsersCollection, addNewUserToUsersCollection)

router.post(`/users/login/:email/:password`, checkThatUserExistsInUsersCollection, checkThatJWTPasswordIsValid, returnUsersDetailsAsJSON)

router.post(`/users/logout`, logout)

router.get(`/users`, getAllUserDocuments) // Route to get all user documents

router.delete(`/users/:id`, deleteUser);

module.exports = router