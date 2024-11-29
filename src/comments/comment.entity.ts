import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from "../posts/post.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    description: "Text content of the comment",
    example: "This is a comment.",
  })
  content: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ApiProperty({ description: "ID of the post", example: 1 })
  post_id: number; // Use snake_case for database column names (convention)
}

export class CommentUpdate {
  @ApiProperty({
    description: "Text content of the comment",
    example: "This is a comment.",
  })
  content: string;
}
