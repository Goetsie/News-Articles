import { User } from 'src/app/security/models/user.model';
import { Article } from './article.model';

export class Reaction {
    constructor(
        public reactionID: number,
        public userID: number,
        public articleID: number,
        public content: string,
        public date: Date
    ) { }
}
