class operationalErrorGenerator extends Error{
    constructor(message,statusCode){
        //override Error super class message
        super(message)
        //Set rest of the perameters
        this.statusCode=statusCode
        this.status=`${statusCode}`.startsWith("4") ? 'fail' : 'error'
        this.isOperational=true
        //Trace where error happen 
        Error.captureStackTrace(this, this.constructor)
    }
}

exports.operationalErrorGenerator=operationalErrorGenerator