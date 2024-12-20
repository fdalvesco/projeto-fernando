import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]), // Register the User entity here
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
