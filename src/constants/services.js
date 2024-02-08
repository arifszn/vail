const MY_SQL = 'mysql';
const ADMINER = 'adminer';
const MINIO = 'minio';
const MAILPIT = 'mailpit';
const RABBITMQ = 'rabbitmq';
const PGSQL = 'pgsql';
const REDIS = 'redis';
const MEMCACHED = 'memcached';
const MARIADB = 'mariadb';
const MEILISEARCH = 'meilisearch';

const NODE_14 = '14';
const NODE_16 = '16';
const NODE_18 = '18';
const NODE_19 = '19';
const NODE_20 = '20';
const NODE_21 = '21';

const SERVICES = [
  MY_SQL,
  ADMINER,
  REDIS,
  MINIO,
  MAILPIT,
  MEILISEARCH,
  MEMCACHED,
  RABBITMQ,
  PGSQL,
  MARIADB,
];

const SERVICES_WITH_VOLUME = [
  MY_SQL,
  MINIO,
  RABBITMQ,
  PGSQL,
  REDIS,
  MARIADB,
  MEILISEARCH,
];

const DEFAULT_SELECTED_SERVICES = [
  MY_SQL,
  ADMINER,
  REDIS,
  MINIO,
  MAILPIT,
  MEILISEARCH,
];

const NODE_VERSIONS = [NODE_14, NODE_16, NODE_18, NODE_19, NODE_20, NODE_21];

const DEFAULT_NODE_VERSION = NODE_21;

// export all
module.exports = {
  NODE_VERSIONS,
  DEFAULT_NODE_VERSION,
  SERVICES,
  SERVICES_WITH_VOLUME,
  DEFAULT_SELECTED_SERVICES,
};
