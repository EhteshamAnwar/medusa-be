import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import FAQService from "../../../../services/faq";

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

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  console.log('inside put post route');
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
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params;
  const manager: EntityManager = req.scope.resolve("manager");

  try {
    const faqService: FAQService = req.scope.resolve("faqService");
    await faqService.deleteFAQ(id, manager);
    return res.status(204).json(); // No content, successful deletion
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
