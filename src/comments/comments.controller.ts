import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment, CommentUpdate } from './comment.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('comments') // Group endpoints under "comments"
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all comments' })
  @ApiResponse({
    status: 200,
    description: 'List of comments successfully retrieved.',
    type: [Comment],
  })
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a comment by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the comment to retrieve',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully retrieved.',
    type: Comment,
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({
    description: 'Comment data for creation',
    type: Comment,
  })
  @ApiResponse({
    status: 201,
    description: 'Comment successfully created.',
    type: Comment,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() comment: Comment) {
    return this.commentsService.create(comment);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing comment' })
  @ApiParam({
    name: 'id',
    description: 'ID of the comment to update',
    type: Number,
    example: 1,
  })
  @ApiBody({
    description: 'Updated comment data',
    type: CommentUpdate,
  })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully updated.',
    type: Comment,
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  update(@Param('id') id: number, @Body() comment: CommentUpdate) {
    return this.commentsService.update(id, comment);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the comment to delete',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
