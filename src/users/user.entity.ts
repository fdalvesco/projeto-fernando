import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  name: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

export class UserDto {
  id: number;
  name: string;
}
