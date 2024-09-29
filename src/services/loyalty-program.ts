import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import LoyaltyProgramRepository from "../repositories/loyalty-program";

class LoyaltyProgramService extends TransactionBaseService {
  private loyaltyProgramRepository: typeof LoyaltyProgramRepository;

  constructor(container) {
    super(container);
    this.loyaltyProgramRepository = container.loyaltyProgramRepository;
  }

  async getAllLoyaltyPrograms() {
    return this.loyaltyProgramRepository.find();
  }

  async addPoints(customerId: string, points: number, manager: EntityManager) {
    return manager.transaction(async (transactionManager) => {
      var loyaltyProgram = await this.loyaltyProgramRepository.findOne({
        where: { customer_id: customerId },
      });

      if (!loyaltyProgram) {
        const newloyaltyProgram = await this.createLoyaltyProgram(customerId,manager);
        loyaltyProgram = newloyaltyProgram;
      }

      loyaltyProgram.points += points;
      return await this.loyaltyProgramRepository.save(loyaltyProgram);
    });
  }

  async createLoyaltyProgram(customerId: string, manager: EntityManager) {
    return manager.transaction(async (transactionManager) => {
      const loyaltyProgram = this.loyaltyProgramRepository.create({
        customer_id: customerId,
        points: 0
      });

      return await this.loyaltyProgramRepository.save(loyaltyProgram);
    });
  }
}

export default LoyaltyProgramService;


