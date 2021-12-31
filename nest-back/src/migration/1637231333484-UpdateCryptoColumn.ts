import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCryptoColumn1637231333484 implements MigrationInterface {
    name = 'UpdateCryptoColumn1637231333484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "PK_9153ef31b5322b6e7e1774fc5f7"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "PK_d29491d47525b7c6166cdaa5764" PRIMARY KEY ("uuid")`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "UQ_5ae70fe2db29bd42ca71b61e0ea" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "UQ_503b0d1eadf815113abb46a832e" UNIQUE ("symbol")`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "UQ_d7b1fc439c4af4293e48b95183d" UNIQUE ("geckoID")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "UQ_d7b1fc439c4af4293e48b95183d"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "UQ_503b0d1eadf815113abb46a832e"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "UQ_5ae70fe2db29bd42ca71b61e0ea"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "PK_d29491d47525b7c6166cdaa5764"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "PK_9153ef31b5322b6e7e1774fc5f7" PRIMARY KEY ("uuid", "name")`);
    }

}
