import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import LoyaltyProgramRepository from "../repositories/loyalty-program";
import { LoyaltyProgram } from "../models/loyalty-program";
class LoyaltyProgramService extends TransactionBaseService {
  private loyaltyProgramRepository: typeof LoyaltyProgramRepository;

  constructor(container) {
    super(container);
    this.loyaltyProgramRepository = container.loyaltyProgramRepository;
  }
   
   async getAllLoyaltyPrograms(manager) {
    return manager.transaction(async (transactionManager) => {
      const loyaltyProgramRepo = transactionManager.withRepository(this.loyaltyProgramRepository);
      return await loyaltyProgramRepo.find();
    });
  }

  async addPoints(customerId: string, points: number, manager: EntityManager) {
    return manager.transaction(async (transactionManager) => {
      const loyaltyProgramRepo = transactionManager.withRepository(this.loyaltyProgramRepository);

      var loyaltyProgram = await loyaltyProgramRepo.findOne({
        where: { customer_id: customerId },
      });

      if (!loyaltyProgram) {
        const newloyaltyProgram: LoyaltyProgram = await loyaltyProgramRepo.create({
          customer_id: customerId,
          points: 0,
        });
        loyaltyProgram = newloyaltyProgram;
      }

      loyaltyProgram.points += points;
      return await loyaltyProgramRepo.save(loyaltyProgram);
    });
  }

  async createLoyaltyProgram(customerId: string, manager: EntityManager) {
    return manager.transaction(async (transactionManager) => {
       const loyaltyProgramRepo = transactionManager.withRepository(this.loyaltyProgramRepository);

      const loyaltyProgram = loyaltyProgramRepo.create({
        customer_id: customerId,
        points: 0,
      });
      return await loyaltyProgramRepo.save(loyaltyProgram);
    });
  }
}

export default LoyaltyProgramService;