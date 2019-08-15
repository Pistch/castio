export default class {
  constructor(db) {
    this.db = db;
  }

  async test() {
    await this.db.createTable('things', [{name: 'name', type: 'varchar(254)'}]);
    const tablesInfo = await this.db.run({query: 'select * from sqlite_master where type = "table";'});

    console.log(tablesInfo);
    this.db.run({query: 'DROP TABLE things'});
  }
}
