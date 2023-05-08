import User from "../models/User.js";
import BadRequestError from "../errors/BadRequestError.js";
import StatusCodes from "http-status-codes";
import UnAuthenticatedError from "../errors/unauthenticated.js";
import NotFoundError from "../errors/not-found.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all the values");
  }

  const userIsAvail = await User.findOne({ email });
  if (userIsAvail) {
    throw new BadRequestError("User with email already exists");
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  const userObj = {
    name: user.name,
    email: user.email,
    location: user.location,
    lastName: user.lastName,
    userId: user._id,
  };
  res
    .status(StatusCodes.CREATED)
    .json({ user, token, location: user.location });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all the values");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Invalid Credentials");
  }
  const isPassword = await user.comparePassword(password);
  console.log(isPassword);
  if (!isPassword) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();

  const userObj = {
    name: user.name,
    email: user.email,
    location: user.location,
    lastName: user.lastName,
    userId: user._id,
  };

  res
    .status(StatusCodes.OK)
    .json({ user: userObj, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if ((!email, !name, !lastName, !location)) {
    throw new BadRequestError("Please input all values");
  }

  const user = await User.findOne({ _id: req.user.userId }).select("-password")

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  await user.save();
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user, token, location });
};

export { register, login, updateUser };
