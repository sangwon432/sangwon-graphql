import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { BaseEntity } from '../../common/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Column()
  @Field()
  public username: string;

  @Column({ unique: true })
  @Field()
  public email: string;

  @Column()
  @Field()
  public password: string;

  @Column({ nullable: true })
  @Field()
  public profileImg?: string;

  @BeforeInsert()
  async handlePreSaveTasks(): Promise<void> {
    // Automatically generate a profile image
    this.profileImg = gravatar.url(this.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
      protocol: 'https',
    });

    // Encrypt the password
    const saltValue = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltValue);
  }
}
