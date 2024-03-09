import userRouter from './userRouter.js'


const routes = (app) => {
   
    // app.use('/posts', postRouter)
    app.use('/users', userRouter)

}

export default routes;