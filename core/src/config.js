import { dbCredentials } from './secrets';

const liveConfiguration = {
  port: 4000,
  graphiql: false,
  cors: false,
  auth: {
    enabled: true,
    jwtAlgorithm: 'HS256',
    jwtExpire: '1h',
  },
  db: {
    host: 'db.laszloborbely.com',
    port: 27017,
    dbName: 'laszloborbely_com',
  },
};

const devConfiguration = {
  port: 4000,
  graphiql: true,
  cors: true,
  auth: {
    enabled: false,
    jwtAlgorithm: 'HS256',
    jwtExpire: '1h',
  },
  db: {
    host: `${dbCredentials.dev.userName}:${dbCredentials.dev.password}@localhost`,
    port: 27017,
    dbName: 'laszloborbely_com',
  },
};

function getCurrentConfiguration() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return liveConfiguration;
    case 'stage':
      return liveConfiguration;
    case 'development':
      return devConfiguration;
    default:
      return devConfiguration;
  }
}

export default getCurrentConfiguration;
