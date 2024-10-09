import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { FAQ } from "../models/faq.entity";

export const FAQRepository = dataSource
  .getRepository(FAQ)
  .extend({
    // Custom method to find FAQ by question
    async findByQuestion(question: string): Promise<FAQ | undefined> {
      return this.findOne({ where: { question } });
    },

    // Custom method to find FAQs by tag
    async findByTag(tagName: string): Promise<FAQ[]> {
      return this.createQueryBuilder("faq")
        .leftJoinAndSelect("faq.tags", "tag")
        .where("tag.name = :tagName", { tagName })
        .getMany();
    }
  });

export default FAQRepository;
