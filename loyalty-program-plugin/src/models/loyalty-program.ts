import {
  Entity,
  BeforeInsert,
  Column,
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"


@Entity()
export class LoyaltyProgram extends BaseEntity{

  @Column({ type: "varchar" }) // Use 'varchar' to match the Customer id type
  customer_id: string;

  @Column({ type: "int", default: 0 })
  points: number;

 @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "LoyaltyProgram")
  }

}
