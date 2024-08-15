import { Entity, Column, ManyToMany, JoinTable , BeforeInsert} from "typeorm";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { FAQTag } from "./faqtags.entity";
import { BaseEntity } from "@medusajs/medusa";

@Entity({ name: "FAQ" })
export class FAQ extends BaseEntity {
  
  @Column("text")
  question: string;

  @Column("text")
  answer: string;

  @ManyToMany(() => FAQTag, { cascade: true })
  @JoinTable({
    name: 'faq_faqtags',
    joinColumn: { name: "faq_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "faqtags_id", referencedColumnName: "id" },
  })
  tags: FAQTag[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "FAQ")
  }
}
