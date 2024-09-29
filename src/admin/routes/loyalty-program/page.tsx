import React, { useEffect, useState } from "react";
import { RouteConfig } from "@medusajs/admin";
import { ShoppingBag } from "@medusajs/icons";
import { Table } from "@medusajs/ui";
import axios from "axios";
import { useAdminCustomQuery } from "medusa-react";
import { LoyaltyProgram as LoyaltyProgramModel} from "../../../models/loyalty-program";

type RequestQuery = {
  
}
type ResponseData = {
  loyaltyProgram: LoyaltyProgramModel[];
};

const LoyaltyProgram = () => {
  const { data, isLoading } = useAdminCustomQuery<RequestQuery, ResponseData>(
    "/loyaltyprogram",
    ["loyaltyProgram"]
  );

  const transformResponseData = (data) => {
    const dataKeys = Object.keys(data).filter(key => !isNaN(key));
    return dataKeys.map(key => data[key]);
  };
  console.log('data returned', data, isLoading);

  let loyaltyPrograms = [];
  if (data) {
    loyaltyPrograms = transformResponseData(data);
  }
  return (
    <div>
      <h1>Loyalty Program {!isLoading && loyaltyPrograms.length}</h1>
      {isLoading && <span>Loading...</span>}

      {!isLoading && loyaltyPrograms.length === 0 && (
        <span>No Post</span>
      )}

      {!isLoading && loyaltyPrograms.length > 0 && (
        <Table>
          <Table.Header>
            <Table.HeaderCell>Customer ID</Table.HeaderCell>
            <Table.HeaderCell>Points</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Updated At</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {loyaltyPrograms.map((program) => (
              <Table.Row key={program.id}>
                <Table.Cell>{program.customer_id}</Table.Cell>
                <Table.Cell>{program.points}</Table.Cell>
                <Table.Cell>{new Date(program.created_at).toLocaleString()}</Table.Cell>
                <Table.Cell>{new Date(program.updated_at).toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Loyalty Programs",
    icon: ShoppingBag,
  },

};


export default LoyaltyProgram;
