export default class Model {
  static fields = [{name: 'column', type: 'TINYINT'}];
  static name = 'model';

  constructor(db) {
    this.db = db;
    this.__init();
  }

  __init() {
    this.db.createTable(this.name, this.fields);
  }

  get(conditions = []) {
    const args = [];
    const conditionsString = conditions
      .map(item => {
        if (typeof item === 'string') {
          return item;
        }

        const {value, operator, name} = item;

        args.push(value);

        return `${name} ${operator || '='} ?`;
      })
      .join(' AND ');
    const query = `SELECT * FROM ${this.name} WHERE ${conditionsString};`;

    this.db.run({query, args});
  }
}
