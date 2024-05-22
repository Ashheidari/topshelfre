const HttpError = require('./Http-error')

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const idRegex = /^[1-9]\d*$/;

const priceRegex = /^\d+(\.\d{1,2})?$/

const isInputValid = (req,res,next)=>{
    const {id,title,author,published_date,price} = req.body
    try {
        if (!title || !author || !isValidDate(published_date) || !priceRegex.test(price)){
            throw new Error('Invalid input data');
        }
        if (req.method === 'POST' && !idRegex.test(id)){
            throw new Error ('Invalid input data')
        }
        next()
        
    } catch (err) {
        const error = new HttpError('Invalid input data', 400);
        return next(error)
    }   
}

const isValidDate = (dateString) =>{
    // Check the date format in YYYY-MM-DD
    if (!dateRegex.test(dateString)){
        return false
    }
    const date = new Date(dateString)
    const now = new Date();
    return !isNaN(date.getTime()) && date <= now;
}

module.exports = isInputValid