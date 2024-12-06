
export const errorHandler = (err, req, res, next) => {
    console.log(`Error Stack: ${err.stack}`);
    const statusCode = err.status || 500;
    res.status(statusCode).send({
        status : 'error',
        message : err.message || 'Internal Server Error',
        stack : process.env.NODE_ENV === 'development' ? err.stack : 'Not available in production'
    })
}