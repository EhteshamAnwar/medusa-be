import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import FAQRepository from "../repositories/faq";
import FAQTagRepository from "../repositories/faqtag";
import { FAQ } from "../models/faq.entity";

class FAQService extends TransactionBaseService {
  private faqRepository: typeof FAQRepository;
  private faqtagRepository: typeof FAQTagRepository;

  constructor(container) {
    super(container);
    this.faqRepository = container.faqRepository;
    this.faqtagRepository = container.faqtagRepository;
  }

  async getFAQsWithPagination(limit: number, offset: number, manager: EntityManager): Promise<[FAQ[], number]> {
    return manager.transaction(async (transactionManager) => {
      const faqRepo = transactionManager.withRepository(this.faqRepository);
      return await faqRepo.findAndCount({
        skip: offset,
        take: limit,
        relations: ["tags"], // Ensure tags are loaded with FAQs
      });
    });
  }

  async createFAQ(question: string, answer: string, tagNames: string[], manager: EntityManager): Promise<FAQ> {
    return manager.transaction(async (transactionManager) => {
      const faqRepo = transactionManager.withRepository(this.faqRepository);
      const tagRepo = transactionManager.withRepository(this.faqtagRepository);

      const tags = await Promise.all(
        tagNames.map(tagName => tagRepo.findOrCreateByName(tagName))
      );
      console.log('saved tags',tags);
      const faq = faqRepo.create({ question, answer, tags });
      console.log('saved faqs',faq);
      return await faqRepo.save(faq);
    });
  }

  async updateFAQ(id: string, question: string, answer: string, tagNames: string[], manager: EntityManager): Promise<FAQ> {
    return manager.transaction(async (transactionManager) => {
      const faqRepo = transactionManager.withRepository(this.faqRepository);
      const tagRepo = transactionManager.withRepository(this.faqtagRepository);

      let faq = await faqRepo.findOne({ where: { id }, relations: ["tags"] });
      if (!faq) {
        throw new Error("FAQ not found");
      }

      faq.question = question;
      faq.answer = answer;

      const tags = await Promise.all(
        tagNames.map(tagName => tagRepo.findOrCreateByName(tagName))
      );

      faq.tags = tags;

      return await faqRepo.save(faq);
    });
  }

  async deleteFAQ(id: string, manager: EntityManager): Promise<void> {
    return manager.transaction(async (transactionManager) => {
      const faqRepo = transactionManager.withRepository(this.faqRepository);
      const faq = await faqRepo.findOne({ where: { id } });
      if (!faq) {
        throw new Error("FAQ not found");
      }

      await faqRepo.remove(faq);
    });
  }
}

export default FAQService;
