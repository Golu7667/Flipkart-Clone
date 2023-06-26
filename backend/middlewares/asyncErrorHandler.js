module.exports = errorFunction => (req, res, next) => {
    // Promise.resolve(errorFunction(req, res, next)).catch(next,console.log(res,req,next));
    Promise.resolve(errorFunction(req, res, next))
  .catch(error => {
    console.log(error);
    next(error);
  });
}