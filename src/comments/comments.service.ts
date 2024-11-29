import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { Comment, CommentUpdate } from "./comment.entity";
import { Post as PostEntity } from "../posts/post.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ["post"] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ["post"], // Eager loading for related post data
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async create(createCommentDto: Comment): Promise<Comment> {
    const post = await this.postsRepository.findOne({
      where: { id: createCommentDto.post_id },
    });
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${createCommentDto.post_id} not found`
      );
    }

    // Set the user relationship
    createCommentDto.post = post;

    return this.commentsRepository.save(createCommentDto);
  }

  async update(id: number, updateCommentDto: CommentUpdate): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ["post"],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    comment.content = updateCommentDto.content || comment.content;

    return this.commentsRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const deleteResult: DeleteResult = await this.commentsRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
