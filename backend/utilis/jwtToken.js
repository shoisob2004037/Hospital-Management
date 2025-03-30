// utils/jwtToken.js
export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  let cookieName;
  if (user.role === "Admin") cookieName = "adminToken";
  else if (user.role === "Patient") cookieName = "patientToken";
  else if (user.role === "Doctor") cookieName = "doctorToken";

  console.log(`Setting cookie: ${cookieName} with token: ${token}`);
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production" ? true : false,
      path: "/",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};