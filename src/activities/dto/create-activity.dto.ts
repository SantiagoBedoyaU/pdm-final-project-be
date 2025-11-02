import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { ActivityIntensity } from "../entities/activity.entity";

export class CreateActivityDto {
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @Min(10)
  durationMinutes: number;

  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsEnum(ActivityIntensity)
  intensity: string;

  @IsOptional()
  notes: string;
}
