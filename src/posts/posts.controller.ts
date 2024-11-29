import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Post as PostEntity } from "./post.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("posts") // Group endpoints under "posts"
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all posts" })
  @ApiResponse({
    status: 200,
    description: "List of posts successfully retrieved.",
    type: [PostEntity],
  })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a post by ID" })
  @ApiParam({
    name: "id",
    description: "ID of the post to retrieve",
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Post successfully retrieved.",
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: "Post not found." })
  findOne(@Param("id") id: number) {
    return this.postsService.findOne(id);
  }

  @Get("/user/:id")
  @ApiOperation({ summary: "Retrieve a post by ID" })
  @ApiParam({
    name: "id",
    description: "ID of the post to retrieve",
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Post successfully retrieved.",
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: "Post not found." })
  findPostsByUser(@Param("id") id: number) {
    return this.postsService.findAllByUser(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new post" })
  @ApiBody({
    description: "Post data for creation",
    type: PostEntity,
  })
  @ApiResponse({
    status: 201,
    description: "Post successfully created.",
    type: PostEntity,
  })
  @ApiResponse({ status: 400, description: "Invalid input." })
  create(@Body() post: Partial<PostEntity>) {
    return this.postsService.create(post);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update an existing post" })
  @ApiParam({
    name: "id",
    description: "ID of the post to update",
    type: Number,
    example: 1,
  })
  @ApiBody({
    description: "Updated post data",
    type: PostEntity,
  })
  @ApiResponse({
    status: 200,
    description: "Post successfully updated.",
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: "Post not found." })
  update(@Param("id") id: number, @Body() post: Partial<PostEntity>) {
    return this.postsService.update(id, post);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a post by ID" })
  @ApiParam({
    name: "id",
    description: "ID of the post to delete",
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Post successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Post not found." })
  remove(@Param("id") id: number) {
    return this.postsService.remove(id);
  }
}
