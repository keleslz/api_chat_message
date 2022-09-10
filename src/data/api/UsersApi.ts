import fs from "fs";
import path from "path";


export class UserApi {
    private source: string = path.join(__dirname, 'users.json')

    public getAll(): Map<string, string> | null {
        return this.get() ?? null
    }

    public getById(id: string): string | null {
        const data = this.get()

        if (data == null) {
            return null
        }

        return data.get(id) ?? null
    }


    public add(id: string): boolean {
        const data = this.get()

        if (data == null) return false

        if (data.has(id)) {
            return true
        }

        data.set(id, id)

        const jsonData = JSON.stringify(Object.fromEntries(data));
        fs.writeFileSync(this.source, jsonData)
        return true
    }

    public remove(id: string): boolean {
        const data = this.get()

        if (data == null) return false

        if (!data.has(id)) {
            return true
        }

        data.delete(id)

        const jsonData = JSON.stringify(Object.fromEntries(data));
        fs.writeFileSync(this.source, jsonData)
        return true
    }

    private get(): Map<string, string> | null {
        const content = fs.readFileSync(this.source)
        let data: Map<string, string> | null = null

        try {
            data = new Map<string, string>(Object.entries(JSON.parse(content.toString())))
        } catch (error: any) {
            this.reload()
            return null
        }

        return data
    }


    private reload(): void {
        fs.writeFileSync(this.source, JSON.stringify({}))
    }
}