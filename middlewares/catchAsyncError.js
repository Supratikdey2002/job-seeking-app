export const catchAsyncError = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
}; //this middle ware function is used to resolve the async error that might occur during
//user login,register,or logout
