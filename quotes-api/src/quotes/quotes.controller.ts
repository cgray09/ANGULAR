import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './interfaces/quote.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  // Get all quotes
  @Get()
  getQuotes(): Promise<Quote[]> {
    return this.quotesService.getQuotes();
  }

  // Get a single quote by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getQuote(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.getQuote(id);
  }

  // Create a new quote (authorId is attached from the authenticated user)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createQuote(@Body() createQuoteDto: CreateQuoteDto, @Request() req: Request) {
    const userId = (req as any).user?.userId; // Use 'sub' instead of userId
    console.log('UserId in Controller:', userId); // Debug userId
    return this.quotesService.createQuote(createQuoteDto, userId);
  }

  // Update an existing quote
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateQuote(
    @Param('id') id: string,
    @Body() updateQuoteDto: Partial<Quote>,
    @Request() req: Request
): Promise<Quote> {
    const userId = (req as any).user?.userId; // Safely extract the userId
    const updatedQuote = await this.quotesService.updateQuote(id, updateQuoteDto, userId);

    if (!updatedQuote) {
        throw new NotFoundException(`Quote with ID ${id} could not be updated.`);
    }

    return updatedQuote;
}

  // Delete a quote
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteQuote(@Param('id') id: string, @Request() req: Request): Promise<void> {
  const userId = (req as any).user?.userId; // Correct usage of optional chaining
  console.log('Extracted userId:', userId);
  return this.quotesService.deleteQuote(id, userId);
  }
}
