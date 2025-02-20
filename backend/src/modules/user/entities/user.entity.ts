import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../../../common/enums/roles.enum'; 
import { Exclude } from 'class-transformer';

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column()
  isActive: boolean;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'simple-array', 
  })
  roles: Role[];
}
