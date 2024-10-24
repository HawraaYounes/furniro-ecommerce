import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../enums/roles.enum';
import * as bcrypt from 'bcrypt';
import { USER_CREATED } from 'src/constants/responses/en/user/user-created';
import { USERS_RETRIEVED } from 'src/constants/responses/en/user/users-retrieved';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }


  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashPassword;
    user.roles = createUserDto.roles ?? [Role.User];
    const newUser = await this.userRepository.save(user);

    return {
      ...USER_CREATED,
      data: newUser,
    };
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findAllUser() {
    const users = await this.userRepository.find();
    return {
      ...USERS_RETRIEVED,
      data: users,
    };
  }

  //TODO: UPDATE Function Response 
  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  //TODO: UPDATE Function Response 
  findOneBy(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  //TODO: UPDATE Function Response 
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  //TODO: UPDATE Function Response 
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}