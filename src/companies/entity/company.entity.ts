import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity({ name: "companies" })
export class CompaniesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  mail: string;

  @Column({})
  password: string;

  @Column()
  salt: string;

  @Column()
  phone: string;

  @Column()
  cnpj: string;

  @Column()
  name: string;

  @Column()
  owner: string;

  @CreateDateColumn({ name: "create_date" })
  created_at: Date;

  @UpdateDateColumn({ name: "update_date" })
  updated_at: Date;

  @Column({ default: null })
  tempToken: string;

  @Column({ default: null })
  tempTokenExpireDate: Date;

  @Column({ default: false })
  is_confirmed: boolean;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
