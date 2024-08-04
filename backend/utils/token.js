import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

  const token = jwt.sign({ userID: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token valid for 1 day
  });

  res.cookie('jwt', token, {

    httpOnly: true, // Cookie is accessible only by the web server
    secure: true ||process.env.NODE_ENV, // Use secure cookies in production
    sameSite: 'strict', // Helps prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default generateToken;
