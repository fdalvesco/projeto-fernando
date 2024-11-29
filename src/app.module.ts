import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { Post } from "./posts/post.entity";
import { Comment } from "./comments/comment.entity";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as dotenv from "dotenv";
import { UsersController } from "./users/users.controller";
import { PostsController } from "./posts/posts.controller";
import { CommentsController } from "./comments/comments.controller";
import { UsersService } from "./users/users.service";
import { PostsService } from "./posts/posts.service";
import { CommentsService } from "./comments/comments.service";
import { UsersModule } from "./users/users.module";

dotenv.config(); // Load environment variables

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE === "mariadb" ? "mariadb" : "mysql", // Change here
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Post, Comment],
      synchronize: true, // Don't use in production for safety
    }),
    TypeOrmModule.forFeature([User, Post, Comment]),
  ],
  controllers: [UsersController, PostsController, CommentsController],
  providers: [AppService, UsersService, PostsService, CommentsService],
})
export class AppModule {}
