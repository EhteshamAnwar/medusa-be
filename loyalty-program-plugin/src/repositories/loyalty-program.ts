import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { LoyaltyProgram } from "../models/loyalty-program";

export const LoyaltyProgramRepository = dataSource
  .getRepository(LoyaltyProgram)
  .extend({});

export default LoyaltyProgramRepository;
