// asyncHandler is a function that takes another function (fn) as an argument
const asyncHandler = (fn) => {
    // It returns a new function that takes req, res, and next as arguments
    return (req, res, next) => {
        // Call the function (fn) and ensure it returns a promise
        Promise.resolve(fn(req, res, next))
            .catch(error => {
                // If there's an error, respond with a 500 status code and the error message
                res.status(500).json({ Message: error.message });
            });
    };
};

// Export the asyncHandler function to use in other parts of your application
export default asyncHandler;


/*By using asyncHandler, you avoid writing repetitive try-catch blocks
 for each async route handler, making your code cleaner and easier to
 maintain.


const asyncHandler=(fn)=>(res,req,next)=>{
    
    Promise.resolve(fn(req,res,next)).catch(error=>{
        res.status(500).json({messaage:error.message});
    });
    
};
*/
