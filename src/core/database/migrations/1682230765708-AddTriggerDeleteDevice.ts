import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTriggerDeleteDevice1682230765708 implements MigrationInterface {
  name = "AddTriggerDeleteDevice1682230765708";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE OR REPLACE FUNCTION set_devices_status_false()
                            RETURNS TRIGGER AS $$
                            BEGIN
                            UPDATE devices SET status=false WHERE id = OLD.id;
                            RETURN NEW;
                            END;
                            $$ LANGUAGE plpgsql;`);

    await queryRunner.query(`CREATE TRIGGER update_status_trigger
                            AFTER UPDATE ON devices
                            FOR EACH ROW
                            WHEN (OLD.delete_date IS NULL AND NEW.delete_date IS NOT NULL)
                            EXECUTE FUNCTION set_devices_status_false();`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_status_trigger ON devices;`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS set_devices_status_false();`,
    );
  }
}
