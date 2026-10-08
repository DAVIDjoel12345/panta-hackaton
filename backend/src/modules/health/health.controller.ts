import { Controller, Get, NotImplementedException } from '@nestjs/common';
@Controller('health')
export class HealthController {
  @Get()
  readiness(): never { throw new NotImplementedException({ statusCode: 501, code: 'NOT_IMPLEMENTED', message: 'Readiness checks are not implemented.' }); }
}
