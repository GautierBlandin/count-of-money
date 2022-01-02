import { MigrationInterface, QueryRunner } from 'typeorm';

export class Crypto1637188532049 implements MigrationInterface {
  name = 'Crypto1637188532049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "crypto_currency" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "imageURL" character varying NOT NULL, "geckoID" character varying NOT NULL, CONSTRAINT "PK_9153ef31b5322b6e7e1774fc5f7" PRIMARY KEY ("uuid", "name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, CONSTRAINT "PK_76b415448b9145997d0016b7195" PRIMARY KEY ("uuid", "email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "crypto_currency"`);
  }
}
