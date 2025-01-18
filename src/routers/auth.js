import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import {
  authLoginSchema,
  authRegisterSchema,
  loginWithGoogleOAuthSchema,
  requestResetEmailSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as authController from '../controllers/auth.js';
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';
import { getGoogleOAuthUrlController } from '../controllers/auth.js';
// import { loginUserSchema } from '../validation/auth.js';
// import { loginUserController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authController.registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authController.loginController),
);

authRouter.post('/refresh', ctrlWrapper(authController.refreshTokenController));

authRouter.post('/logout', ctrlWrapper(authController.logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(authController.requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(authController.loginWithGoogleController),
);

export default authRouter;
