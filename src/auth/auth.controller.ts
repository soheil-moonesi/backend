import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { signinAuthDto } from './dto/signin-auth.dto';
import { Response } from 'express';
import { RolesGuard } from './auth.guard';
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
  async signin(@Body() body: signinAuthDto, @Res() res: Response) {
    //@Res() decorator provides access to the Response object from the Express.js library
    const token = await this.authService.signin(body.email, body.password);
    // to set cookie it must do in controller not service- security reasons
    // for this reason we get token form service and then set cookie here
    console.log(token);
    return res.cookie('jwt', token).send('ok');
    // it must use return --> because program after set cookie know what to do.
  }

  @Get('/admin')
  @UseGuards(RolesGuard)
  findAll() {
    console.log('ss');
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
