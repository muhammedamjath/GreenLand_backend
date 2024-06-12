const componyRegCollection=require('../models/componyRegister')


// compony registration post
exports.componyReg=async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const filLocatione=req.file.location
    const {componyName,location,category,discription}=req.body

    let componyReg= new componyRegCollection({
        componyName:componyName,
        location:location,
        category:category,
        discription:discription,
        image:filLocatione
    })

   await componyReg.save()
   
}

