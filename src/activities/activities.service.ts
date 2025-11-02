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
  ){}

  create(createActivityDto: CreateActivityDto) {
    return this.activityRepository.save(createActivityDto)
  }

  findAll() {
    return this.activityRepository.find();
  }

  async findOne(id: number) {
    const activity = await this.activityRepository.findOneBy({id})
    if (!activity) {
      throw new NotFoundException('activity not found')
    }
    return activity
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activityRepository.findOneBy({id})
    if (!activity) {
      throw new NotFoundException('activity not found')
    }

    await this.activityRepository.update({id}, updateActivityDto)
  }

  async remove(id: number) {
    const activity = await this.activityRepository.findOneBy({id})
    if (!activity) {
      throw new NotFoundException('activity not found')
    }

    return this.activityRepository.remove(activity)
  }
}
