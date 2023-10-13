import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  //1.constructor: This is the constructor method of a TypeScript class.
  // Constructors are called when an instance of the class is created.
  //2.@InjectRepository(User): This is a decorator used for dependency injection.
  // It tells the framework to inject a repository for the User entity into the class.
  //3.private repo: Repository<User>: This is defining a private class property named repo of type Repository<User>.
  //It's using TypeScript's type annotations to specify that repo will be an instance of the Repository class, specialized for the User entity.
  create(email: string, password: string, name: string, lastName: string) {
    const user = this.repo.create({ email, password, name, lastName });
    // create a new instance of an entity without persisting it to the database immediately.
    // It's essentially used for creating a new entity object in memory.
    return this.repo.save(user);
    //The save method is used to persist an entity
    // (that may have been created with create or retrieved from the database) to the database.
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
