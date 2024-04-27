const { Schema , model , models } = require('mongoose')

const UserSchema = new Schema({
    email : {
        type : String ,
        required : [ true , 'Email is required' ],
        unique : [ true , 'Email is already in use']
    } ,
    username : {
        type : String ,
        required : [ true , 'Username is required' ],
        trim : true ,
        maxLength : 50 ,
        minLength : 2 
    } ,
    image : {
        type : String ,
    }
}) 

const User = models.User || model('User' , UserSchema)

export default User

