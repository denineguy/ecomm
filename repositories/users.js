const fs = require('fs');
const crypto = require('crypto');
const { REPL_MODE_SLOPPY } = require('repl');

class UsersRepository {
    constructor(filename) {
        if(!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        
        try {
            fs.accessSync(this.filename);  //way to check if a file exists
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        } 
    }
    async getAll() {
        //Open the file called this.filename
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));

    };

    async create(attrs) {
        attrs.id = this.randomId();
        const records = await this.getAll();
        records.push(attrs)
       
        await this.writeAll(records)

    }

    async writeAll(records) {
         //write the updated records array back to this.filename
        await fs.promises.writeFile(
            this.filename, 
            JSON.stringify(records, null, 2)
            );
    }

    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords); 
    }
}

const test = async () => {
    const repo = new UsersRepository('users.json');

    await repo.delete('e3d9d28c');

    // console.log(user);
};

test();

