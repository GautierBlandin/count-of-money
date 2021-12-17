import {MigrationInterface, QueryRunner} from "typeorm";

export class userAdminBool1639736311535 implements MigrationInterface {
    name = 'userAdminBool1639736311535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "admin"`);
    }

}
