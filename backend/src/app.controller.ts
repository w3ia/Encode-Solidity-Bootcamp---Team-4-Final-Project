import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { QueueAndExecuteDTO } from './dtos/queueAndExecuteDTO';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/queue-and-execute")
  async queueAndExecute(@Body() body : QueueAndExecuteDTO): Promise <{ executeTxId: string }> {
    return { executeTxId: await this.appService.queueAndExecute(body.projectURL, body.studentAddress) };
  }
}