import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  email: string;

  @Column("text")
  username: string;

  @Column("bytea")
  password: Buffer;

  @Column("bytea")
  salt: Buffer;
}
