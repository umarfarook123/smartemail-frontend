import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('google_auth_token')
export class GoogleAuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({ nullable: true })
  expiresIn: number;

  @Column()
  tokenType: string;

  @Column({ nullable: true })
  scope: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
