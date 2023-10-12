import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//1.first it must import appService
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //2.create instance of appService
  @Get()
  //3.when GET  request is call in this route of controller and next route of GET
  // --> it is call the getHello method
  getHello(): string {
    return this.appService.getHello();
  }
}
