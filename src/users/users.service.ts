import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Post } from '../posts/post.entity';  // Import the Post entity if needed

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  create(user: Partial<User>) {
    console.log(user)
    return this.usersRepository.save(user);
  }

  update(id: number, user: Partial<User>) {
    return this.usersRepository.update(id, user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

}
