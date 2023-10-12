import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//1.first it must import appService 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
//
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}