import { DataSource } from 'typeorm';
import { config } from './orm.config';

export const connectionSource = new DataSource(config);
