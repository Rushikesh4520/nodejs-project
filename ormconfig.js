

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'mynodeapi',
  entities: [__dirname + '/src/entities/*.js'],
  synchronize: true,
};
