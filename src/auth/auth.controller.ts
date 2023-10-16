import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { signinAuthDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    //we can send createAuthDto to the service and then destructure it
    return this.authService.create(createAuthDto);
  }

  @Post('/signup')
  createUser(@Body() body: CreateAuthDto) {
    //we can destructure createAuthDto and then send it to service
    return this.authService.signup(
      body.email,
      body.password,
      body.name,
      body.lastName,
    );
  }

  @Post('/signin')
  signin(@Body() body: signinAuthDto) {
    console.log('active here');
    return this.authService.signin(body.email, body.password);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
