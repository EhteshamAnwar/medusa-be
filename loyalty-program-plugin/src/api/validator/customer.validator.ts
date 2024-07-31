import { AdminPostCustomersReq as MedusaAdminPostCustomersReq } from "@medusajs/medusa/dist/api/routes/admin/customers/create-customer";
import { AdminPostCustomersCustomerReq as MedusaAdminPostCustomersCustomerReq } from '@medusajs/medusa/dist/api/routes/admin/customers/update-customer';

import { IsBoolean, IsOptional, IsString, ValidateNested,  } from "class-validator";
import { Type } from "class-transformer";
import { LoyaltyProgram } from "../../models/loyalty-program";


export class AdminPostCustomersReq extends MedusaAdminPostCustomersReq {
   @IsOptional()
   @ValidateNested()
   @Type(() => LoyaltyProgram)
   loyaltyProgram: LoyaltyProgram;
}

export class AdminPostCustomersCustomerReq extends MedusaAdminPostCustomersCustomerReq {
   @IsOptional()
   @ValidateNested()
   @Type(() => LoyaltyProgram)
   loyaltyProgram: LoyaltyProgram;
}