export interface Quote {
  _id?: string;          // Optional ID
  title: string;
  author: string;        // Author's name
  authorId: string;      // User ID of the creator (added)
}
