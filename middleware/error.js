class errorhandler extends Error{
constructor(message,statuscode){
    super(message);
    this.statusCode=statuscode;
}
}
export const err = (err, req, res, next) => {
  console.error("Error:", err);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

// export const err=((err,req,res,next)=>{
//     err.message=err.message||"internal server error";
//     err.statuscode=err.statuscode ||500;
//     return res.status(404).json({
//         sucess:false,
//         message:err.message
//     })
// })
export default errorhandler
