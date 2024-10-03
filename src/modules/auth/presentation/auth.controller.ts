import { Body, Controller, Post } from '@nestjs/common';
import { AuthApplicationService } from '../application/services/auth-application.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
  ) {}

  @Post()
  async login(@Body() body: any) {
    const result = await this.authApplicationService.loginUser(
      body.email,
      body.password,
    );
    return { JWT: result };
  }
}
