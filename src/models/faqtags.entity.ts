import { Entity, Column, BeforeInsert} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity({ name: "FAQTags" })
export class FAQTag extends BaseEntity{

  @Column({ unique: true })
  name: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "FAQT")
  }
}
