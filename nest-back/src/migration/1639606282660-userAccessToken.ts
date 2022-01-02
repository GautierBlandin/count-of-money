import { MigrationInterface, QueryRunner } from 'typeorm';

export class userAccessToken1639606282660 implements MigrationInterface {
  name = 'userAccessToken1639606282660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "access_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "access_token"`);
  }
}
