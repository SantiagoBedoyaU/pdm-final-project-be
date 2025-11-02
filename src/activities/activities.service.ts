import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  create(createActivityDto: CreateActivityDto, user: string) {
    return this.activityRepository.save({ ...createActivityDto, owner: user });
  }

  findAll(user: string) {
    return this.activityRepository.findBy({ owner: user });
  }

  async findOne(id: number, user: string) {
    const activity = await this.activityRepository.findOneBy({
      id,
      owner: user,
    });
    if (!activity) {
      throw new NotFoundException('activity not found');
    }
    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto, user: string) {
    const activity = await this.activityRepository.findOneBy({
      id,
      owner: user,
    });
    if (!activity) {
      throw new NotFoundException('activity not found');
    }

    await this.activityRepository.update(
      { id, owner: user },
      updateActivityDto,
    );
  }

  async remove(id: number, user: string) {
    const activity = await this.activityRepository.findOneBy({
      id,
      owner: user,
    });
    if (!activity) {
      throw new NotFoundException('activity not found');
    }

    await this.activityRepository.remove(activity);
  }
}
