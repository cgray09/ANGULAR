import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Quote } from './interfaces/quote.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuotesService {
  constructor(@InjectModel('Quote') private readonly quoteModel: Model<Quote>) {}

  // Retrieve all quotes
  async getQuotes(): Promise<Quote[]> {
    return await this.quoteModel.find().exec();
  }

  // Retrieve a single quote by ID
  async getQuote(id: string): Promise<Quote> {
    const quote = await this.quoteModel.findById(id).exec();
    if (!quote) {
      throw new HttpException('Quote Not Found', HttpStatus.NOT_FOUND);
    }
    return quote;
  }

  // Create a new quote, attaching the author's ID
  async createQuote(createQuoteDto: Partial<Quote>, userId: string): Promise<Quote> {
    console.log('UserId received in service:', userId); // Debug userId
    const newQuote = new this.quoteModel({
      ...createQuoteDto,
      authorId: userId, // Explicitly set the authorId
    });
    return await newQuote.save();
  }

  // Update an existing quote (ensure the user is the author)
  async updateQuote(id: string, updateQuoteDto: Partial<Quote>, userId: string): Promise<Quote | null> {
    const quote = await this.quoteModel.findById(id).exec();

    if (!quote) {
      throw new HttpException('Quote Not Found', HttpStatus.NOT_FOUND);
    }

    if (quote.authorId.toString() !== userId) {
      throw new HttpException('Forbidden: You are not the author', HttpStatus.FORBIDDEN);
    }

    return await this.quoteModel.findByIdAndUpdate(id, updateQuoteDto, { new: true });
  }

  // Delete a quote (ensure the user is the author)
  async deleteQuote(id: string, userId: string): Promise<void> {
    const quote = await this.quoteModel.findById(id).exec();

    if (!quote) {
      throw new HttpException('Quote Not Found', HttpStatus.NOT_FOUND);
    }

    console.log("userId service: ", userId)
    console.log("quote.authorId.toString(): ", quote.authorId.toString())


    if (quote.authorId.toString() !== userId) {
      throw new HttpException('Forbidden: You are not the author', HttpStatus.FORBIDDEN);
    }

    await this.quoteModel.findByIdAndDelete(id);
  }
}
