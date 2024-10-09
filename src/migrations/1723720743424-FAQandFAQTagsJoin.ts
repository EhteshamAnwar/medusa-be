import { MigrationInterface, QueryRunner , Table} from "typeorm"

export class FAQandFAQTagsJoin1723720743424 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "faq_faqtags",
        columns: [
          {
            name: "faq_id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "faqtags_id",
            type: "varchar",
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["faq_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "FAQ",
            onDelete: "CASCADE",
          },
          {
            columnNames: ["faqtags_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "FAQTags",
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("faq_faqtags");
  }
}

