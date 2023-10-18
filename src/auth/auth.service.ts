import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    // Call the create method from the userService
    const user = this.usersService.create(
      createAuthDto.email,
      createAuthDto.password,
      createAuthDto.name,
      createAuthDto.lastName,
    );
    return 'This action adds a new user in db but it is for test auth route path for more feature';
  }

  async signup(
    email: string,
    password: string,
    name: string,
    lastName: string,
  ) {
    const userExist = await this.usersService.find(email);
    console.log(userExist);
    if (userExist.length) {
      throw new NotFoundException('user in use');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = this.usersService.create(email, hash, name, lastName);

      console.log(email, hash);
    }
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const passwordDb = user.password;
    //compare password in signin with hased password in db
    const isMatch = await bcrypt.compare(password, passwordDb);

    if (isMatch) {
      //note: must use this structure for payload
      // "iss" (issuer), "sub" (subject), "exp" (expiration time)
      // "iat" (issued at time), and others.
      const payload = { x: user.email };
      //generate jwt token with payload --> user email
      const token = await this.jwtService.signAsync(payload, { expiresIn: '1m' });
      console.log(token, payload);
      return token
    } else {
      throw new NotFoundException('wrong password');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
