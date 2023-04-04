import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateApproveTokensDTO } from './dtos/createApproveTokensDTO';
import { CreateRequestTokensDTO } from './dtos/createRequestTokensDTO';
import { CreateMintTokensDTO } from './dtos/createMintTokensDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("token/address")
  async getTokenAddress(): Promise <{ address: string }> {
    return { address: await this.appService.getTokenAddress() };
  }

  @Get("token/supply")
  async getTokenSupply(): Promise <{ supply: number }> {
    return { supply: await this.appService.getTokenSupply() };
  }

  @Get("token/balance-of")
  async getBalanceOf(
    @Query('address') address: string): Promise <{balance: number}>{
    return { balance: await this.appService.getBalanceOf(address) };
  }

  @Get("token/allowance")
  async getTokenAllowance(
    @Query('from') from: string,
    @Query('to') to: string
    ): Promise <{ allowance :number }> {
    return { allowance: await this.appService.getTokenAllowance(from, to) };
  }

  @Post("token/approve")
  async giveApproval(@Body() body: CreateApproveTokensDTO): Promise<{ approved: string }> {
    return { approved: await this.appService.giveApproval(body.address, body.amount, body.signature) };
  }

  @Post("token/request")
  async requestTokens(@Body() body: CreateRequestTokensDTO): Promise<{ transfered: string }> {
    return { transfered: await this.appService.requestTokens(body.to, body.amount, body.signature) };
  }
  
  @Post("token/mint")
  async mintTokens(@Body() body : CreateMintTokensDTO) {
    return {result: await this.appService.mintTokens(body.address, body.amount)};
  }

  @Get("ballot/winner")
  async getBallotWinner(): Promise <{ winner: string }> {
    return { winner: await this.appService.getBallotWinner() };
  }

  @Get('ballot/votes')
  getVotes(): Object {
    return this.appService.getVotes();
  } 
}