import { MigrationInterface, QueryRunner , Table, TableForeignKey} from "typeorm"

export class LoyaltyProgram1721357897859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

           await queryRunner.createTable(
      new Table({
        name: "loyalty_program",
        columns: [
          { name: "id", type: "varchar", isPrimary: true,  },
          { name: "customer_id", type: "varchar" }, 
          { name: "points", type: "int" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "loyalty_program",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "customer",
        onDelete: "CASCADE",
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable("loyalty_program");

    }

}
