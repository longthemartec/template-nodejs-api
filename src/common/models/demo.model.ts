import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity({ name: 'table_name' })
export class TableName extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Unique(['email'])
  @Column()
  email: string | undefined

  @Column()
  firstName: string | undefined

  @Column()
  lastName: string | undefined

  @Exclude()
  @Column()
  password: string | undefined

  @Column({ default: true })
  isActive: boolean | undefined

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  createdAt: string | undefined

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updatedAt: string | undefined

  constructor(partial: Partial<TableName>) {
    super()
    Object.assign(this, partial)
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
