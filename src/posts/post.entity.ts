import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity'; // Assuming User entity is in users folder
import { Comment } from '../comments/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: 'Title of the post', example: 'My First Post' })
  title: string;

  @Column()
  @ApiProperty({ description: 'Content of the post', example: 'This is the content of my first post.' })
  content: string;

  @ApiProperty({ description: 'ID of the user who authored the post', example: 1 })
  user_id: number; // Use snake_case for database column names (convention)

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' }) // Eager loading by default
  user: User; // Removed UserDto (not needed for relationship)

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}