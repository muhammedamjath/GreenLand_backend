const clientSignupSchema=require('../models/userSignup')



exports.userSignup=async(req,res)=>{
    // console.log(req.body);
    const {name,email,mobNo,password}=req.body

    let userSignup=new clientSignupSchema({
        name:name,
        email:email,
        mobNo:mobNo,
        password:password,
        category:'user'
    })

    await userSignup.save()
    // res.status(200).json('recived noushah ali')
}

exports.contractorSignup=async(req,res)=>{
    console.log(req.body);
    const {name,email,mobNo,password}=req.body

    let contractorSignup=new clientSignupSchema({
        name:name,
        email:email,
        mobNo:mobNo,
        password:password,
        category:'contractor'
    })

    await contractorSignup.save()
}