import jwt from "jsonwebtoken";

const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1h",
    }
  );
};

const generateOTP = () => {
  let digits = "0123456789";
  let OTP = "";
  let len = digits.length;
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }

  return OTP;
};

export { generateToken, generateOTP };
