import  * as services from "../services";

export const createUser = async (req, res) => {
    try {

        // var username=req.body.username
        const { username, numbers, email, avartar, password,confirmPassword} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        const error=[]

         if (!username) {
            error.push({'username':'Enter your username'})
         }
         if (!numbers ) {
        
            error.push({'numbers':'Enter your numbers'})
         }

         if (!email ) {

            error.push({'email':'Enter your email'})
         }

        //  if (!avartar ) {
        //     error.username='Vui lòng nhập email'
        //  }


         if (!password ) {
     
            error.push({'password':'Enter your password'})
         }


         if (!confirmPassword) {
         
            error.push({'confirmPassword':'Enter your confirmed password'})
         }


         if(password!==confirmPassword){

            error.push({'confirmPassword':'Your password does not match'})

         }

         if(!isCheckEmail){

            error.push({'email':'Vui lòng nhập email hợp lệ'})

         }




         if(error.length<=0){
            const response = await services.createNewUser(req, res);
            return res.status(200).json({
                error:0,
                status:'Success',
                data:response
            })


         }else{


            return res.status(500).json({
                error:error.length,
                status:'Success',
                message:error
            })


         }
         
           
        
    } catch (error) {
        return res.status(500).json({
            error:1,
            status:'Failed'
        })

    }

}


export const getAllUsers =async(req,res)=>{
  
    try {
       


        // // console.log('req.body',req.body)
        
        // // console.log('req.params',req.params.id)
        // // console.log('req.query',req.query)
        const response = await services.getAllUsers(req,res);
        return res.status(200).json({
            error:1,
            status:'Success',
            data:response
        })
    } catch (error) {
        return res.status(500).json({
            error:1,
            status:'Failed'
        })
    }

}



export const getOneUser =async(req,res)=>{
  
    try {
       


        // // console.log('req.body',req.body)
        
        // // console.log('req.params',req.params.id)
        // // console.log('req.query',req.query)
        const response = await services.getOneUser(req,res);
        return res.status(200).json({
            error:1,
            status:'Success',
            data:response
        })
    } catch (error) {
        return res.status(500).json({
            error:1,
            status:'Failed'
        })
    }

}




export const deleteUser =async(req,res)=>{
  
    try {
       


        // // console.log('req.body',req.body)
        
        // // console.log('req.params',req.params.id)
        // // console.log('req.query',req.query)
        const response = await services.deleteUser(req,res);
        return res.status(200).json({
            error:1,
            status:'Success',
            data:response
        })
    } catch (error) {
        return res.status(500).json({
            error:1,
            status:'Failed'
        })
    }

}


export const updateUser =async(req,res)=>{
  
    try {
       
         // var username=req.body.username
        //  const { username, numbers, email, avartar, status} = req.body
        //  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        //  const isCheckEmail = reg.test(email)
 
         const error=[]
 
        //   if (!username) {
        //      error.push({'username':'Enter your username'})
        //   }
        //   if (!numbers ) {
         
        //      error.push({'numbers':'Enter your numbers'})
        //   }
 
        //   if (!email ) {
 
        //      error.push({'email':'Enter your email'})
        //   }
 
         //  if (!avartar ) {
         //     error.username='Vui lòng nhập email'
         //  }
 
 
        //   if (!status ) {
      
        //      error.push({'status':'Enter your status'})
        //   }
 
 
        
 
 
 
        //   if(!isCheckEmail){
 
        //      error.push({'email':'Vui lòng nhập email hợp lệ'})
 
        //   }
 
 
 
 
          if(error.length<=0){

        // // console.log('req.body',req.body)
        
        // // console.log('req.params',req.params.id)
        // // console.log('req.query',req.query)
        const response = await services.updateUser(req,res);
        return res.status(200).json({
            error:1,
            status:'Success',
            data:response
        })}else{
            
            return res.status(500).json({
                error:error.length,
                status:'Success',
                message:error
            })


        }




    } catch (error) {
        return res.status(500).json({
            error:1,
            status:'Failed'
        })
    }

}



export const signUpUser =async(req,res)=>{
  
    try {
       
         // var username=req.body.username
        //  const { username, numbers, email, avartar, status} = req.body
        //  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        //  const isCheckEmail = reg.test(email)
 
         const error=[]
 
        //   if (!username) {
        //      error.push({'username':'Enter your username'})
        //   }
        //   if (!numbers ) {
         
        //      error.push({'numbers':'Enter your numbers'})
        //   }
 
        //   if (!email ) {
 
        //      error.push({'email':'Enter your email'})
        //   }
 
         //  if (!avartar ) {
         //     error.username='Vui lòng nhập email'
         //  }
 
 
        //   if (!status ) {
      
        //      error.push({'status':'Enter your status'})
        //   }
 
 
        
 
 
 
        //   if(!isCheckEmail){
 
        //      error.push({'email':'Vui lòng nhập email hợp lệ'})
 
        //   }
 
 
 
 
          if(error.length<=0){

        // // console.log('req.body',req.body)
        
        // // console.log('req.params',req.params.id)
        // // console.log('req.query',req.query)
        const response = await services.signUpUser(req,res);
        return res.status(200).json({
            error:0,
            status:'Success',
            data:response
        })}else{
            
            return res.status(500).json({
                error:error.length,
                status:'Success',
                message:error
            })


        }




    } catch (error) {
        return res.status(500).json({
            error:1,
            status:'Failed'
        })
    }

}



export const signInUser =async(req,res)=>{
  
    try {
       
         // var username=req.body.username
        //  const { username, numbers, email, avartar, status} = req.body
        //  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        //  const isCheckEmail = reg.test(email)
 
         const error=[]
 
        //   if (!username) {
        //      error.push({'username':'Enter your username'})
        //   }
        //   if (!numbers ) {
         
        //      error.push({'numbers':'Enter your numbers'})
        //   }
 
        //   if (!email ) {
 
        //      error.push({'email':'Enter your email'})
        //   }
 
         //  if (!avartar ) {
         //     error.username='Vui lòng nhập email'
         //  }
 
 
        //   if (!status ) {
      
        //      error.push({'status':'Enter your status'})
        //   }
 
 
        
 
 
 
        //   if(!isCheckEmail){
 
        //      error.push({'email':'Vui lòng nhập email hợp lệ'})
 
        //   }
 
 
 
 
          if(error.length<=0){

        // // console.log('req.body',req.body)
        
        // // console.log('req.params',req.params.id)
        // // console.log('req.query',req.query)
        const response = await services.signInUser(req,res);
        return res.status(200).json({
            error:0,
            status:'Success',
            data:response
        })}else{
            
            return res.status(500).json({
                error:error.length,
                status:'Success',
                message:error
            })


        }




    } catch (error) {
        return res.status(500).json({
            error:1,
            status:'Failed'
        })
    }

}


export const forgotPassword =async(req,res)=>{
  
    try {
       
         // var username=req.body.username
        //  const { username, numbers, email, avartar, status} = req.body
        //  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        //  const isCheckEmail = reg.test(email)
 
         const error=[]
 
        //   if (!username) {
        //      error.push({'username':'Enter your username'})
        //   }
        //   if (!numbers ) {
         
        //      error.push({'numbers':'Enter your numbers'})
        //   }
 
        //   if (!email ) {
 
        //      error.push({'email':'Enter your email'})
        //   }
 
         //  if (!avartar ) {
         //     error.username='Vui lòng nhập email'
         //  }
 
 
        //   if (!status ) {
      
        //      error.push({'status':'Enter your status'})
        //   }
 
 
        
 
 
 
        //   if(!isCheckEmail){
 
        //      error.push({'email':'Vui lòng nhập email hợp lệ'})
 
        //   }
 
 
 
 
          if(error.length<=0){

        // // console.log('req.body',req.body)
        
        // // console.log('req.params',req.params.id)
        // // console.log('req.query',req.query)
        const response = await services.forgotPassword(req,res);
        return res.status(200).json({
            error:0,
            status:'Success',
            data:response
        })}else{
            
            return res.status(500).json({
                error:error.length,
                status:'Success',
                message:error
            })


        }




    } catch (error) {
        return res.status(500).json({
            error:1,
            status:'Failed'
        })
    }

}






