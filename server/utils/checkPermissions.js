import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {

  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError("User is not allowed to access this route");
};

export default checkPermissions;
