import { LoyaltyProgram } from "../models/loyalty-program";

export type UpdateOnboardingStateInput = {
  current_step?: string;
  is_complete?: boolean;
  product_id?: string;
};

export interface AdminOnboardingUpdateStateReq {}

export type LoyaltyProgramRes = {
  status: LoyaltyProgram;
};
