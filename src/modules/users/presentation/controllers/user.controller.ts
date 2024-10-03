import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { UserApplicationService } from '../../application/services/user-application.service';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userApplicationService: UserApplicationService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userApplicationService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
  }
}
