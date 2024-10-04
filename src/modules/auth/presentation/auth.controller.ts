import { Body, Controller, Post } from '@nestjs/common';
import { AuthApplicationService } from '../application/services/auth-application.service';
import { LoginDto } from '../application/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
  ) {}

  @Post()
  async login(@Body() body: LoginDto) {
    return await this.authApplicationService.loginUser(
      body.email,
      body.password,
    );
  }
}
