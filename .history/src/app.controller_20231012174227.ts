import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//1.first it must import appService
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //2.create instance of appService
  @Get()
  //3.when 
  getHello(): string {
    return this.appService.getHello();
  }
}
