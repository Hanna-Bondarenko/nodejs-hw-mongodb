import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  const userData = await authServices.register(req.body);

  // eslint-disable-next-line no-unused-vars
  const { password, ...userWithoutPassword } = userData.toObject();

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: userWithoutPassword,
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);
  console.log(session);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully login user',
    data: {
      accessToken: session.accessToken,
    },
  });
};
