import StatusCodes from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  const defaultError = {
    status_code: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong, Please try again later..",
  };

  //Handling mongoose validation error
  if (error.name === "ValidationError") {
    (defaultError.status_code = StatusCodes.BAD_REQUEST),
      (defaultError.message = Object.values(error.errors)
        .map((item) => item.message)
        .join(","));
  }

  if (error.name === "CastError") {
    defaultError.status_code = StatusCodes.NOT_FOUND;
    defaultError.message = `Resource with id ${error.value} not found`;
  }

  //Handling mongoose unique error
  if (error.code && error.code === 11000) {
    defaultError.status_code = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(
      error.keyValue
    )}field has to be unique`;
  }
  res.status(defaultError.status_code).json({ msg: defaultError.message });
};

export default errorHandlerMiddleware;
