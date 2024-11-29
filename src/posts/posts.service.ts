import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post as PostEntity } from "./post.entity";
import { User } from "../users/user.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find({
      relations: ["user", "comments"],
      order: {
        id: "DESC",
      },
    });
  }

  async findAllByUser(id: number): Promise<PostEntity[]> {
    // Find user by ID directly within the service
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.postsRepository.find({
      relations: ["user", "comments"],
      where: { user },
      order: {
        id: "DESC",
      },
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ["user", "comments"], // Ensure related data is loaded
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(postData: Partial<PostEntity>): Promise<PostEntity> {
    // Find user by ID directly within the service
    const user = await this.usersRepository.findOne({
      where: { id: postData.user_id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${postData.user_id} not found`);
    }

    // Set the user relationship
    postData.user = user;

    // No need to delete created_by as it's not a property in the Post entity
    return this.postsRepository.save(postData);
  }

  async update(
    id: number,
    updateData: Partial<PostEntity>
  ): Promise<PostEntity> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Update allowed fields
    post.title = updateData.title || post.title;
    post.content = updateData.content || post.content;

    // Update user if provided
    if (updateData.user_id) {
      const user = await this.usersRepository.findOneBy({
        id: updateData.user_id,
      });
      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateData.user_id} not found`
        );
      }
      post.user = user;
    }

    const updatedPost = await this.postsRepository.save(post);
    return updatedPost;
  }

  async remove(id: number): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

}
