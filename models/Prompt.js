const { Schema , model , models } = require('mongoose')

const PromptSchema = new Schema({

    prompt : {
        type : String ,
        required : [true , 'Prompt is required'],
        minLength : [2 , 'min length is 2 characters']
    },
    tags : {
        type : String ,
        required : [true , 'Tags are required'],
        minLength : [2 , 'min length is 2 characters']
    },
    creator : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

})

const Prompt = models.Prompt || model('Prompt' , PromptSchema)

export default Prompt