import {PantaService} from '../panta/service.js';
import {ZodError} from 'zod';
import {Catch,UseFilters,HttpException,type ExceptionFilter,type ArgumentsHost} from '@nestjs/common';
@Catch()
class InputErrorFilter implements ExceptionFilter {catch(error:unknown,host:ArgumentsHost){const res=host.switchToHttp().getResponse();if(error instanceof ZodError){res.status(400).json({code:'VALIDATION_FAILED',message:'Invalid request fields. Review the form values.'});return}if(error instanceof HttpException){res.status(error.getStatus()).json(error.getResponse());return}res.status(503).json({code:'SERVICE_UNAVAILABLE',message:'Operation unavailable. Retry a read or check transaction status before another submission.'})}}

import {Body,Controller,Delete,Get,Inject,Module,Post,Put,Req,Res,SetMetadata,Sse,ForbiddenException,Param,Query} from '@nestjs/common';
import {merge,interval,map} from 'rxjs';
import {RuntimeStore} from './runtime-store.js';
import {LiveServices} from './providers.js';
import {aiProvider} from './ai-provider.js';
interface Request { headers: Record<string,string|undefined>; ip?: string; }
interface Response { setHeader(name:string,value:string):void; }
@SetMetadata('runtimeRoute',true)
@Controller()
@UseFilters(InputErrorFilter)
class RuntimeController {
  private readonly services:LiveServices;
  private readonly panta:PantaService;
  constructor(@Inject(RuntimeStore) private readonly store:RuntimeStore){this.services=new LiveServices(store);this.panta=new PantaService(store,this.services.panta)}
  @Get('runtime/health') health(){return {application:'panta-signal-backend',status:'ok',serverTime:new Date().toISOString(),database:this.store.db.prepare('SELECT 1 AS connected').get(),providers:{ai:aiProvider().key?'configured':'missing-key',markets:process.env.PANTA_API_KEY?'configured':'missing-key'},marketRefreshSeconds:10,marketDetailRefreshSeconds:2}}
  @Get('markets') markets(@Req() req:Request,@Query() query:Record<string,string>){this.store.rate('markets:'+req.ip,600);const {cursor,...filters}=query;return this.services.markets(undefined,cursor,false,filters)}
  @Get('markets/:id') market(@Req() req:Request,@Param('id') id:string){this.store.rate('markets:'+req.ip,600);return this.services.markets(id,undefined)}
  @Get('markets/:id/trades') trades(@Req() req:Request,@Param('id') id:string){this.store.rate('markets:'+req.ip,600);return this.services.markets(id,undefined,true)}
  @Get('markets/:id/series') marketSeries(@Req() req:Request,@Param('id') id:string,@Query('range') range:string){this.store.rate('markets:'+req.ip,600);return this.services.marketSeries(id,range||'1h')}

  @Get('panta/config') pantaConfig(){return this.panta.config()}
  @Get('categories') categories(){return this.panta.client.categories()}
  @Get('positions') positions(@Req() req:Request,@Query('wallet') wallet:string){this.store.require(req.headers.cookie);this.store.rate('positions:'+req.ip,60);return this.panta.client.positions(wallet)}
  @Get('wallets/:wallet/trades') walletTrades(@Req() req:Request,@Param('wallet') wallet:string){this.store.require(req.headers.cookie);return this.panta.client.walletTrades(wallet)}
  @Get('wallets/:wallet/balances') balances(@Req() req:Request,@Param('wallet') wallet:string){this.store.require(req.headers.cookie);return this.panta.chain.balances(wallet)}
  @Get('panta/creator/:wallet') creator(@Req() req:Request,@Param('wallet') wallet:string){return this.panta.creatorMarkets(req.headers.cookie,wallet)}
  @Get('panta/operator/:operation') operator(@Req() req:Request,@Param('operation') operation:string){return this.panta.operator(req.headers.cookie,operation)}
  @Post('panta/image-upload') upload(@Req() req:Request){this.origin(req);this.store.require(req.headers.cookie);this.store.rate('upload:'+req.ip,10);return this.panta.client.upload()}
  @Get('panta/intents') intents(@Req() req:Request){return this.panta.list(req.headers.cookie)}
  @Get('panta/intents/:id') intent(@Req() req:Request,@Param('id') id:string){return this.panta.read(req.headers.cookie,id)}
  @Post('panta/intents') prepare(@Req() req:Request,@Body() body:unknown){this.origin(req);return this.panta.prepare(req.headers.cookie,body)}
  @Post('panta/intents/:id/build') buildIntent(@Req() req:Request,@Param('id') id:string){this.origin(req);return this.panta.build(req.headers.cookie,id)}
  @Post('panta/intents/:id/broadcast') broadcast(@Req() req:Request,@Param('id') id:string,@Body() body:unknown){this.origin(req);return this.panta.broadcast(req.headers.cookie,id,body)}
  @Post('panta/intents/:id/reconcile') reconcile(@Req() req:Request,@Param('id') id:string){this.origin(req);this.store.rate('reconcile:'+req.ip,40);return this.panta.reconcile(req.headers.cookie,id)}
  @Get('ai/conversations') conversations(@Req() req:Request){return this.services.list(req.headers.cookie)}
  @Get('ai/market-context/:id') marketContext(@Req() req:Request,@Param('id') id:string){this.store.rate('research:'+req.ip,60);return this.services.marketResearch(req.headers.cookie,id)}
  @Get('ai/conversations/:id') conversation(@Req() req:Request,@Param('id') id:string){return this.services.conversation(req.headers.cookie,id)}
  @Delete('ai/conversations/:id') deleteConversation(@Req() req:Request,@Param('id') id:string){this.origin(req);return this.services.deleteConversation(req.headers.cookie,id)}
  @Post('ai/chat') chat(@Req() req:Request,@Body() body:unknown){this.origin(req);return this.services.chat(req.headers.cookie,body)}
  private origin(req:Request){
    const allowed=(process.env.FRONTEND_ORIGINS||'http://127.0.0.1:5174,http://localhost:5173,http://127.0.0.1:5173').split(',');
    if(!req.headers.origin||!allowed.includes(req.headers.origin))throw new ForbiddenException('Untrusted request origin.');
    if(!req.headers['content-type']?.startsWith('application/json'))throw new ForbiddenException('JSON requests are required.');
  }
  private cookie(res:Response,token:string){res.setHeader('Set-Cookie',`panta_session=${token}; Path=/api; HttpOnly; SameSite=Strict; Max-Age=${token?604800:0}${process.env.NODE_ENV==='production'?'; Secure':''}`)}
  @Get('bootstrap') bootstrap(@Req() req:Request){return this.store.bootstrap(req.headers.cookie)}
  @Get('account/export') export(@Req() req:Request){return this.store.accountExport(req.headers.cookie)}
  @Get('market-drafts') drafts(@Req() req:Request){return this.store.marketDrafts(req.headers.cookie,undefined)}
  @Post('market-drafts') draft(@Req() req:Request,@Body() body:unknown){this.origin(req);return this.store.marketDrafts(req.headers.cookie,body)}
  @Get('communities/state') state(@Req() req:Request){return this.store.snapshot(req.headers.cookie)}
  @Post('auth/register') async register(@Req() req:Request,@Res({passthrough:true}) res:Response,@Body() body:unknown){this.origin(req);const token=await this.store.authenticate(body,true,req.ip);this.cookie(res,token);return {authenticated:true}}
  @Post('auth/login') async login(@Req() req:Request,@Res({passthrough:true}) res:Response,@Body() body:unknown){this.origin(req);const token=await this.store.authenticate(body,false,req.ip);this.cookie(res,token);return {authenticated:true}}
  @Post('auth/logout') logout(@Req() req:Request,@Res({passthrough:true}) res:Response){this.origin(req);this.store.logout(req.headers.cookie);this.cookie(res,'');return {authenticated:false}}
  @Post('communities/commands') async command(@Req() req:Request,@Body() body:unknown){this.origin(req);this.store.require(req.headers.cookie);const reference=(body as {value?:{marketId?:unknown}})?.value?.marketId;if(reference){if(typeof reference!=='string')throw new ForbiddenException('Invalid market reference.');await this.panta.client.market(reference)}return this.store.command(req.headers.cookie,body)}
  @Put('notifications/read') notifications(@Req() req:Request,@Body() body:unknown){this.origin(req);return this.store.readNotifications(req.headers.cookie,body)}
  @Put('settings/me') settings(@Req() req:Request,@Body() body:unknown){this.origin(req);return this.store.saveSettings(req.headers.cookie,body)}
  @Sse('events') events(){return merge(this.store.events,interval(25000).pipe(map(()=>({data:{type:'heartbeat'}}))))}
}
@Module({controllers:[RuntimeController],providers:[{provide:RuntimeStore,useFactory:()=>new RuntimeStore()}],exports:[RuntimeStore]})
export class RuntimeModule {}
