import { BaseEntity } from '@app/common';
import { hash } from 'bcrypt';
import {BeforeInsert, Column, Entity} from 'typeorm'
import { v4 } from 'uuid';

export enum Role {
  PUBLIC = 'PUBLIC',
  AUTHENTIFICATED = 'AUTHENTIFICATED',
  ADMIN = 'ADMIN',
}

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 3);
  }

  @Column({ default: '', nullable: true })
  registered_from_url: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  blocked: boolean;

  @Column({ type: 'enum', default: Role.PUBLIC, enum: Role })
  role: Role;

  @Column({nullable:false})
  confirmation_id: string;

  @BeforeInsert()
  async generateConfirmationId(){
    this.confirmation_id = v4()
  }

  @Column({nullable:true})
  profile_id:number
}