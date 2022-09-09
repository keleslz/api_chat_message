import fs from "fs"

export class UserApi {
    private source: string = './Users.json'

    public getAll(): Map<string,string> {
        const content = fs.readFileSync(this.source)
        console.log(content, 'content');
        
        return new Map()
    }

    public getBy(): Map<string,string> {
        const content = fs.readFileSync(this.source)
        console.log(content, 'content');
        
        return new Map()
    }
}