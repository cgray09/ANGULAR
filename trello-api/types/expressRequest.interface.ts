import { Request } from "express";
import { UserDocument } from "./user.interface";

export interface ExpressRequestInterface extends Request {
  user?: UserDocument;
  params: { [key: string]: string }; // Add proper typing for params
  body: { [key: string]: any };     // Add proper typing for body
  headers: { [key: string]: string }; // Add proper typing for headers
}
