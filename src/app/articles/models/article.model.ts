export class Article {
    constructor(public articleID: number,
        public title: string,
        public subTitle: string, // Maybe make this optional
        public shortSummary: string,
        public body: string,
        public imgPath: string,
        public tagID: number,
        public userID: number,
        public articleStatusID: number,
    ) { }

}
