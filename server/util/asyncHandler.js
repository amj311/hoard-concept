const asyncHandler = (fn) =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args);
    const res = args[args.length - 2];
    return Promise.resolve(fnReturn)
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.send(JSON.stringify({error: "Something went wrong"}));
        });
  };

module.exports = asyncHandler;
