import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ActivityIntensity } from '../entities/activity.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNumber()
  @Min(10)
  durationMinutes: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ActivityIntensity)
  intensity: string;

  @ApiProperty()
  @IsOptional()
  notes: string;
}
