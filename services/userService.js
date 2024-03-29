import { db, storage,auth } from '../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, getDocs, addDoc, deleteDoc, doc, query, onSnapshot, orderBy, limit, startAfter, serverTimestamp, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updateProfile, verifyBeforeUpdateEmail } from 'firebase/auth';

const { Readable } = require('stream');

const { upload, cloudinary } = require('../upload_function/multerCloudinary.js');
const dotenv = require('dotenv');
dotenv.config();



export const createNewUser =(req,res)=>new Promise(async(resolve, reject)=>{
    try {

        const {username, numbers, email, password,confirmPassword}=req.body;
        const fileData=req.files;
        const id=uuidv4();

    
          
                                if(fileData && fileData.length>0){ 
                        
                                    const newUser={
                                    id:id,
                                    username: username,
                                    numbers:numbers,
                                    email:email,
                                    images:[],
                                    password: password,
                                    status:'active',
                                    createdAt: serverTimestamp(),
                                    updateAt: serverTimestamp()
                                    
                                }
                                await createUserWithEmailAndPassword(auth, email, password).then(async()=>{
                                    
                                                await setDoc(doc(db, "user", id), newUser)
                                                .then(async() => {
                                                    
                                                        
                                                // console.log("Document successfully updated!");
                                                        let imageDatas =[]
                                                        for (let i = 0; i < fileData.length; i++) {
                                
                                                            const uploadStream = cloudinary.uploader.upload_stream(
                                                                { resource_type: 'auto', folder: 'file_uploads' },
                                                                async(error, result) => {
                                                                if (error) {
                                                                    // console.error('Error uploading file:', error);
                                                                    res.status(500).json({ 'error': 'Lỗi tải file' });
                                                                } else {
                                                                    const fileUrl = result.secure_url;
                                                                    const publicId = result.public_id;
                                                                //    console.log(' result.secure_url', result.secure_url);
                                                                //    console.log(' result.public_id', result.public_id);
                                                                    const imageData ={
                                                                        userId:id,
                                                                        public_id:result.public_id,
                                                                        url:result.secure_url
                                                                        
                                                                    };
                                
                                                                    imageDatas.push(imageData)
                                
                                                                    const userRef = doc(db, "user", id);
                                                                    await updateDoc(userRef, {
                                                                        images:imageDatas
                                                                    })
                                
                                            
                                            
                                                                    }
                                                                }
                                                            );
                                                
                                                    const bufferStream = new Readable();
                                                    bufferStream.push(fileData[i].buffer);
                                                    bufferStream.push(null);
                                                    bufferStream.pipe(uploadStream);
                                                    
                                                }
                                
                                                resolve({
                                                            error:0, 
                                                            message:'Add user successfully',
                                                        
                                                        })
                                                
                                    
                                                })
                                                .catch((error) => {
                                                    reject({
                                                        error:1, 
                                                        message:error
                                                    })
                                                });;
                    
                    
                    
                                }).catch((error)=>{
                    
                    
                                    reject({
                                        error:1, 
                                        message:error
                                    })
                    
                                });
                    
                            
                    
                    
                    
                                
                            
                            
                            
                            }else{
                    
                                    const newUser={
                                    id:id,
                                    username: username,
                                    numbers:numbers,
                                    email:email,
                                    images:[],
                                    password: password,
                                    status:'active',
                                    createdAt: serverTimestamp(),
                                    updateAt: serverTimestamp()
                                    
                                }
                        
                                setDoc(doc(db, "user", id), newUser)
                                .then(() => {
                                    // console.log("Document successfully updated!");
                    
                                        resolve({
                                            error:0, 
                                            message:'Add user successfully',
                                        
                                        })
                        
                        
                        
                                    })
                                    .catch((error) => {
                        
                                        reject({
                                            error:1, 
                                            message:error
                                        })
                    
                                    });;
                    
                                
                            }

                





          
       
    } catch (error) {
         reject({
            error:1, 
            message:error
        
        })
    }
})



export const getAllUsers =(req,res)=>new Promise(async(resolve, reject)=>{
    try {

                //    onAuthStateChanged(auth, async(user) => {
                    
                //     if (user) {
                    


                        // const user = auth.currentUser;

                        // if (user !== null) {
                        //     console.log("Sign-in provider: " + user);
                       
                        // }


                        // const usersCollectionRef = collection(db, "user");
                    // const queryUsers = query(
                    //     usersCollectionRef
                    //     // ,
                    //     // orderBy("createdAt")
                    //   );
                    //     const unsuscribe = onSnapshot(queryUsers, (snapshot) => {
                    //     let users = [];
                    //     snapshot.forEach((doc) => {
                    //         users.push({ ...doc.data(), id: doc.id });
                    //     });



                        
                    //     resolve({
                    //         error:0, 
                    //         message:'Success',
                    //         data:users
                        
                        
                    //     })
                    
                    //   });


                    const querySnapshot = await getDocs(collection(db, "user"));
                    let users = [];
                    querySnapshot.forEach((doc) => {
                        users.push({ ...doc.data(), id: doc.id });
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    });

                    resolve({
                    error:0, 
                    message:'Get all users successfully',
                    data:users
                    })



                    



                //     } else {
                    

                //         resolve({
                //             error:1, 
                //             message:'Sign in before doing that action !',
                    
                //             })



                //     }
                // });

           
        
           
       

       
    } catch (error) {
         reject({
            error:1, 
            message:error
        
        })
    }
})


export const getOneUser =(req,res)=>new Promise(async(resolve, reject)=>{
    try {

        // console.log('ppppppppp',555555)
        const {id}=req.body;  
        const docRef = doc(db, "user",id);
        const docSnap = await getDoc(docRef);

       
        if(auth.currentUser.email===docSnap.data().email){


                    if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    resolve({
                        error:0, 
                        message:'Get one user successfully',
                        data:docSnap.data()
                        })

                    } else {
                    // docSnap.data() will be undefined in this case
                    // console.log("No such document!");
                        reject({
                            error:1, 
                            message:"No such document!"
                        
                        })
                    }
        }else{

            reject({
                error:1, 
                message:"No such document!"
            
            })


        }

        
           
       

       
    } catch (error) {
         reject({
            error:1, 
            message:error
        
        })
    }
})



export const deleteOneUser =(req,res)=>new Promise(async(resolve, reject)=>{
    try {




        const {id}=req.body;   
        const docRef = doc(db, "user",id);
        const docSnap_delete = await getDoc(docRef);

                    if (docSnap_delete.exists()) {


                        if(auth.currentUser.email===docSnap_delete.data().email){
                            
                        const array_images= docSnap_delete.data().images

                        for (let i = 0; i < array_images.length; i++) {
                            const public_id=array_images[i].public_id;
                            await cloudinary.uploader.destroy(public_id);
                            // console.log('oooooooooo',array_images[i])
                    
                        }

                        const docSnap= await deleteDoc(doc(db, "user", id));
                                await deleteUser(auth.currentUser)
                        
                            resolve({
                            error:0, 
                            message:'Delelted user successfully'
                            })

                        }else{
                             
                            reject({
                                error:1, 
                                message:"No such document!"
                            
                            })
                        }



         }else{

            reject({
                error:1, 
                message:"No such document!"
            
            })
         }
        
           
    
    } catch (error) {
         reject({
            error:1, 
            message:error
        
        })
    }
})


export const updateUser =(req,res)=>new Promise(async(resolve, reject)=>{
    try {


           
        const {id,email,...body}=req.body;
        const fileData=req.files; 

        
        const docRef1 = doc(db, "user",id);
        const docSnap_delete1 = await getDoc(docRef1);
        if(auth.currentUser.email===docSnap_delete1.data().email){

        if(fileData && fileData.length>0){ 
               

        const docRef = doc(db, "user",id);
        const docSnap_delete = await getDoc(docRef);
        let imageDatas =[]
        if (docSnap_delete.exists()) {
           const array_images= docSnap_delete.data().images

                const userRef = doc(db, "user", id);                 
                for (let i = 0; i < array_images.length; i++) {
                    const public_id=array_images[i].public_id;
                    await cloudinary.uploader.destroy(public_id);
                    await updateDoc(userRef, {
                        images:imageDatas
                     })



                    // console.log('oooooooooo',array_images[i])
            
                }

              
                    for (let i = 0; i < fileData.length; i++) {

                        const uploadStream = cloudinary.uploader.upload_stream(
                            { resource_type: 'auto', folder: 'file_uploads' },
                            async(error, result) => {
                            if (error) {
                                // console.error('Error uploading file:', error);
                                res.status(500).json({ 'error': 'Lỗi tải file' });
                            } else {
                                const fileUrl = result.secure_url;
                                const publicId = result.public_id;
                            //    console.log(' result.secure_url', result.secure_url);
                            //    console.log(' result.public_id', result.public_id);
                                const imageData ={
                                    userId:id,
                                    public_id:result.public_id,
                                    url:result.secure_url
                                    
                                };

                                imageDatas.push(imageData)
                                 const userRef = doc(db, "user", id);
                                 await updateDoc(userRef, {
                                    ...body,
                                    images:imageDatas
                                 })


                                

        
        
                                }
                               
                            }
                        );
            
                            const bufferStream = new Readable();
                            bufferStream.push(fileData[i].buffer);
                            bufferStream.push(null);
                            bufferStream.pipe(uploadStream);
                        }
                        // console.log('...body',...body)


                


                    
                        resolve({
                        error:0, 
                        message:'Updated user successfully'
                        })


                
                    

                

         }else{

            reject({
                error:1, 
                message:"No such document!"
            
            })
         }







        }else{

            const {id,username,email,numbers,status}=req.body;

            const userRef = doc(db, "user", id);
            updateDoc(userRef, {
                   
                    username:username,
                    email:email,
                    numbers:numbers,
                    status:status,
                    updateAt:serverTimestamp()
            })
    
            resolve({
                error:0, 
                message:'Updated user successfully'
                    })


        }



      }else{

        reject({
            error:1, 
            message:"No such document!"
        
        })


      }


        
      
       


    
    } catch (error) {
         reject({
            error:1, 
            message:error
        
        })
    }
})








export const signInUser =(req,res)=>new Promise(async(resolve, reject)=>{

    const {email, password}=req.body
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        resolve({
            error: 0,
            message: 'Signed in successfully',
            data: user
        });
    } catch (error) {
        reject({
            error: 1,
            message: error
        });
    }
})



export const forgotPassword =(req,res)=>new Promise(async(resolve, reject)=>{

    const {email}=req.body
    try {
         await sendPasswordResetEmail(auth,email);
        
        resolve({
            error: 0,
            message: 'Password has been sent successfully',
            
        });
    } catch (error) {

        reject({
            error: 1,
            message: error
        });
    }
})



export const signOutUser =(req,res)=>new Promise(async(resolve, reject)=>{

  
    try {
        await signOut(auth)
        
        resolve({
            error: 0,
            message: 'You sign out successfully',
            
        });
    } catch (error) {

        reject({
            error: 1,
            message: error
        });
    }
})



// export const signUpUser =(req,res)=>new Promise(async(resolve, reject)=>{



    



//         const {email, password}=req.body
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//             resolve({
//                 error: 0,
//                 message: 'Signed up successfully',
//                 data: user
//             });
//         } catch (error) {
          
//             reject({
//                 error: 1,
//                 message: error
//             });
//         }
// })


// export const delete_User =(req,res)=>new Promise(async(resolve, reject)=>{

  
//     try {
//         await deleteUser(auth.currentUser)
        
//         resolve({
//             error: 0,
//             message: 'You deleted user successfully',
            
//         });
//     } catch (error) {

//         reject({
//             error: 1,
//             message: error
//         });
//     }
// })












