"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCryptoColumn1637231333484 = void 0;
class UpdateCryptoColumn1637231333484 {
    constructor() {
        this.name = 'UpdateCryptoColumn1637231333484';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "PK_9153ef31b5322b6e7e1774fc5f7"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "PK_d29491d47525b7c6166cdaa5764" PRIMARY KEY ("uuid")`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "UQ_5ae70fe2db29bd42ca71b61e0ea" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "UQ_503b0d1eadf815113abb46a832e" UNIQUE ("symbol")`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "UQ_d7b1fc439c4af4293e48b95183d" UNIQUE ("geckoID")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "UQ_d7b1fc439c4af4293e48b95183d"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "UQ_503b0d1eadf815113abb46a832e"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "UQ_5ae70fe2db29bd42ca71b61e0ea"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" DROP CONSTRAINT "PK_d29491d47525b7c6166cdaa5764"`);
        await queryRunner.query(`ALTER TABLE "crypto_currency" ADD CONSTRAINT "PK_9153ef31b5322b6e7e1774fc5f7" PRIMARY KEY ("uuid", "name")`);
    }
}
exports.UpdateCryptoColumn1637231333484 = UpdateCryptoColumn1637231333484;
