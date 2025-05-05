import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/hello-world')
export class HelloWorldController {
  @Get()
  getHelloWorld(): string {
    return 'Hello world!';
  }
}
