import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { FAQTag } from "../models/faqtags.entity";

export const FAQTagRepository = dataSource
  .getRepository(FAQTag)
  .extend({
    // Custom method to find a tag by its name
    async findByName(name: string): Promise<FAQTag | undefined> {
      return this.findOne({ where: { name } });
    },

    // Custom method to create a new tag if it doesn't exist
    async findOrCreateByName(name: string): Promise<FAQTag> {
      let tag = await this.findByName(name);
      if (!tag) {
        tag = this.create({ name });
        await this.save(tag);
      }
      return tag;
    }
  });

export default FAQTagRepository;