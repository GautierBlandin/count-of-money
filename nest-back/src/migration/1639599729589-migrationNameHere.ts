import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationNameHere1639599729589 implements MigrationInterface {
  name = 'migrationNameHere1639599729589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "currency" character varying NOT NULL DEFAULT 'EUR'`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "cryptos" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "press_keywords" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_76b415448b9145997d0016b7195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password_hash" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password_hash" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_a95e949168be7b7ece1a2382fed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_76b415448b9145997d0016b7195" PRIMARY KEY ("uuid", "email")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "press_keywords"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cryptos"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "currency"`);
  }
}
