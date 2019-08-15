import {SQLite} from 'expo-sqlite';

export default class Database {
  constructor(name) {
    this.db = SQLite.openDatabase(name);
  }

  run({query, args = []}) {
    if (!query) {
      throw new Error('Empty query provided');
    }

    const result = {};

    const resultCatcher = (tx, resultSet, error) => {
      if (resultSet) {
        result.result = resultSet;
      }

      if (error) {
        result.error = error;
      }
    };

    return new Promise((resolve, reject) => {
      this.db.transaction(
        transaction => {
          transaction.executeSql(query, args, resultCatcher, resultCatcher);
        },
        reject,
        r => resolve(result, r)
      );
    });
  }

  createTable(tableName, columns) {
    const columnsParams = columns.map(({name, type}) => `${name} ${type.toUpperCase()}`);
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, ${columnsParams.join(', ')})`;

    return this.run({
      query,
      args: [tableName]
    });
  }
}
