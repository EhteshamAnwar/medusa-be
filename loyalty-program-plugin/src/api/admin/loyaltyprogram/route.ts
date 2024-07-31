import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import LoyaltyProgramService from "../../../services/loyalty-program";

interface CreateLoyaltyProgramBody {
  customerId: string;
}

interface AddPointsBody {
  customerId: string;
  points: number;
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const loyaltyProgramService: LoyaltyProgramService = req.scope.resolve("loyaltyProgramService");
  const manager: EntityManager = req.scope.resolve("manager");
  const loyalties = await loyaltyProgramService.getAllLoyaltyPrograms(manager);
  return res.json(loyalties);
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { customerId } = req.body as CreateLoyaltyProgramBody;
  const manager: EntityManager = req.scope.resolve("manager");

  try {
    const loyaltyProgramService = req.scope.resolve("loyaltyProgramService");
    const loyaltyProgram = await loyaltyProgramService.createLoyaltyProgram(customerId, manager);
    return res.status(201).json(loyaltyProgram);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const ADD_POINTS = async (req: MedusaRequest, res: MedusaResponse) => {
  const { customerId, points } = req.body as AddPointsBody;
  const manager: EntityManager = req.scope.resolve("manager");

  try {
    const loyaltyProgramService = req.scope.resolve("LoyaltyProgramService");

    const loyaltyProgram = await loyaltyProgramService.addPoints(customerId, points, manager);
    return res.status(200).json(loyaltyProgram);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};