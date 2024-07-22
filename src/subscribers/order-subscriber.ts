import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import LoyaltyProgramService from "../services/loyalty-program";
import { EntityManager } from "typeorm";


export default async function orderCompletedHandler({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const loyaltyProgramService: LoyaltyProgramService = container.resolve(
    "loyaltyProgramService",
  );
  const orderService = container.resolve("orderService");
   const manager: EntityManager = container.resolve("manager");
  
  const { id: orderId } = data;
  const order = await orderService.retrieveWithTotals(orderId);
  // console.log('inside the subscriber');
  // console.log('order',order);

  await loyaltyProgramService.addPoints(order.customer_id, Math.floor(order.subtotal/(100*10)), manager);
}

export const config: SubscriberConfig = {
  event: "order.placed",
  context: {
    subscriberId: "order.placed-handler",
  },
};

