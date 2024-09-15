import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../enums/roles.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }


  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.roles = createUserDto.roles ?? [Role.User];
    return this.userRepository.save(user);
  }


  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneBy(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}