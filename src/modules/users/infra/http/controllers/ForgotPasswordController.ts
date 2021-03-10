import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordToken from '../../../services/SendForgotPasswordToken';

class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordToken = container.resolve(SendForgotPasswordToken);
    await sendForgotPasswordToken.execute({ email });

    return response.sendStatus(204);
  }

  async reset(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password, passwordConfirm } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);
    await resetPasswordService.execute({
      password,
      passwordConfirm,
      token: String(token),
    });

    return response.sendStatus(204);
  }
}

export default ForgotPasswordController;
