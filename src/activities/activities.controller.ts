import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('activities')
@UseGuards(AuthGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto, @Request() req) {
    return this.activitiesService.create(createActivityDto, req.user.email);
  }

  @Get()
  findAll(@Request() req) {
    return this.activitiesService.findAll(req.user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.activitiesService.findOne(+id, req.user.email);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Request() req,
  ) {
    return this.activitiesService.update(
      +id,
      updateActivityDto,
      req.user.email,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Request() req) {
    return this.activitiesService.remove(+id, req.user.email);
  }
}
