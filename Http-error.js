class HttpError extends Error{
    constructor(message,stausCode){
        super(message);
        this.statusCode = stausCode;
    }

}

module.exports = HttpError;