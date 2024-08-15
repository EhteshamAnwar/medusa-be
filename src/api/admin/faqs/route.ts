import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import FAQService from "../../../services/faq";

interface CreateFAQBody {
  question: string;
  answer: string;
  tags: string[];
}

interface UpdateFAQBody {
  question: string;
  answer: string;
  tags: string[];
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const faqService: FAQService = req.scope.resolve("faqService");
    const manager: EntityManager = req.scope.resolve("manager");
  
    const { limit = 10, offset = 0 } = req.query;
  
    try {
      const [faqs, total] = await faqService.getFAQsWithPagination(
        parseInt(limit as string),
        parseInt(offset as string),
        manager
      );
      return res.json({ faqs, total, limit: parseInt(limit as string), offset: parseInt(offset as string) });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { question, answer, tags } = req.body as CreateFAQBody;
  const manager: EntityManager = req.scope.resolve("manager");

  try {
    const faqService: FAQService = req.scope.resolve("faqService");
    const faq = await faqService.createFAQ(question, answer, tags, manager);
    return res.status(201).json(faq);
  } catch (error) {
      return res.status(400).json({ error: error.message });
    }
};

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  console.log('inside put route');
    const { id } = req.params;
  const { question, answer, tags } = req.body as UpdateFAQBody;
  const manager: EntityManager = req.scope.resolve("manager");

  try {
    const faqService: FAQService = req.scope.resolve("faqService");
    const updatedFAQ = await faqService.updateFAQ(id, question, answer, tags, manager);
    return res.status(200).json(updatedFAQ);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};
