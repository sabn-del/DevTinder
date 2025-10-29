const validator= require("validator")
const validateSignUpData =(req)=>{
    const{firstName, lastName,emailId,password}= req.body;
    if(!firstName || !lastName){
        throw new Error('Name is not valid')
    }
    else if(!validator.isEmail(emailId)){
        throw new Error('Not a valid Email')
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('Please enter a strong  password')
    }

}
const validateEditData = (req) => {
     const ALLOWED_FIELDS=['firstName','lastName','emailId','photoUrl','age','gender','skills','about']

        const isUpdate_Allowed= Object.keys(req.body).every((field)=>ALLOWED_FIELDS.includes(field))
        //  if(!isUpdate_Allowed){
        //     throw new Error('Update not allowed')

        // }
        // if(data.skills.length>10){
        //     throw new Error('skills cannot be more than 10')
        // }
        return isUpdate_Allowed
}
module.exports={
    validateEditData,
    validateSignUpData
    
}