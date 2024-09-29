export default async function () {
  const imports = (await import(
      "@medusajs/medusa/dist/api/routes/admin/customers/index"
      )) as any

  const customersStoreRoute = (await import("@medusajs/medusa/dist/api/routes/store/customers/index")) as any

  imports.defaultAdminCustomerFields = [
    ...imports.defaultAdminCustomerFields,
    "loyaltyProgram",
  ]

  customersStoreRoute.allowedStoreCustomersFields = [
    ...customersStoreRoute.allowedStoreCustomersFields,
       "loyaltyProgram",
  ]

  customersStoreRoute.defaultStoreCustomersFields = [
    ...customersStoreRoute.defaultStoreCustomersFields,
       "loyaltyProgram",
  ]
}
