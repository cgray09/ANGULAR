import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
    @ApiProperty()
    readonly title!: string; // Non-null assertion operator

    @ApiProperty()
    readonly author!: string; // Non-null assertion operator
}
