import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ActivityIntensity {
  LOW = 'Baja',
  MEDIUM = 'Media',
  HIGH = 'Alta',
}

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  durationMinutes: number;

  @Column()
  date: Date;

  @Column({
    enum: ActivityIntensity,
  })
  intensity: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ select: false })
  owner: string;
}
