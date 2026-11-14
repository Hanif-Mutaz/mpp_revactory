export class AppError extends Error{constructor(status,code,message,details){super(message);this.status=status;this.code=code;this.details=details}}
export const ok=(res,data,status=200)=>res.status(status).json({ok:true,data});
export const asyncRoute=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
