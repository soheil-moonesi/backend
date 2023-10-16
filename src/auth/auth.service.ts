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
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const isMatch = await bcrypt.compare('999', hash);
    const user = this.usersService.create(email, hash, name, lastName);

    console.log(email, hash, isMatch);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const passwordDb = user.password;
    if (user.password == passwordDb) {
      console.log('true password');
    } else {
      console.log('false password');
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
