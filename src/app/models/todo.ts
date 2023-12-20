export class Todo {
    _id!: string;
    content: string;
    status: number;

    constructor(id: string, content: string, status: number = 0) {
        this._id = id;
        this.content = content;
        this.status = status;
    }
}