export class Post {
  constructor(
    public title: string,
    public description: string,
    public imagePath: string,
    public author: any,
    public datetimeCreated: Date,
    public numberOfLikes: any
  ) {}
}
