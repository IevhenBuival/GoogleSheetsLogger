import { Grid } from 'src/entities/Grid';
import Logs from 'src/entities/Logs';
import { DataSource, DataSourceOptions } from 'typeorm';

function getSSLConfig(env: string) {
  const configs: { [key: string]: boolean | { [key: string]: boolean } } = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false },
  };
  if (!configs[env] === undefined) {
    throw new Error('Set network in your .env file');
  }
  return configs[env];
}

const AppDataSource = () => {
  try {
    const options: DataSourceOptions = {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      logging: ['query', 'error'],
      type: 'postgres',
      entities: [Logs, Grid], //'dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/**/*.{ts,js}'],
      subscribers: ['src/subscriber/**/*.ts'],
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      ssl: getSSLConfig(process.env.SERVER_MODE || 'dev'),
      synchronize: true,
    };
    const AppDataSource = new DataSource(options);

    return AppDataSource;
  } catch (err) {
    process.exit(1);
  }
};

const connectDB = AppDataSource();

export default connectDB;
