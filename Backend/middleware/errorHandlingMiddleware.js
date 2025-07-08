//error handler middleware


 const errorHandler=async(err,req,res,next)=>{
    console.error(err.stack);


    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal server error';


    res.status(statusCode).json({
        success:false,
        error:message,
        ...err(process.env.NODE_ENV==='developement' && {stack: err.stack}),
    });

}



export default errorHandler;