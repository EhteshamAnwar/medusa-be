import { Customer as MedusaCustomer } from "@medusajs/medusa";
import { Entity, OneToMany, OneToOne , JoinColumn } from "typeorm";
import { LoyaltyProgram } from "./loyalty-program"; 

@Entity()
export class Customer extends MedusaCustomer {
  @OneToOne(() => LoyaltyProgram,{ eager: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'customer_id' })
  loyaltyProgram: LoyaltyProgram;
}
