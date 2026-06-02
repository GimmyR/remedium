import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;