import { Body, Controller, Post } from '@nestjs/common';
import { AuthApplicationService } from '../application/services/auth-application.service';
import { LoginDto } from '../application/dto/login.dto';
import { RefreshTokenDto } from '../application/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authApplicationService.loginUser(
      body.email,
      body.password,
    );
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.authApplicationService.refreshToken(body.refreshToken);
  }
}
