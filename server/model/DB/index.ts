import { MongoClient } from 'mongodb';
import DBconfig from './Config.json';

class DB {
    DB_Client: MongoClient;
    
    constructor() {
        this.DB_Client = new MongoClient(`mongodb://${DBconfig.host}/${DBconfig.DataBase}`);
        this.DB_Client.connect();
        console.log("Database Connected");
        
        this.test();
    }

    async test() {
        let tmp = await this.DB_Client.db().collection('Users').findOne();
        if (tmp)
            console.log(tmp);
    }

    GetConnection() {
        return this.DB_Client.db();
    }
}

export default new DB();