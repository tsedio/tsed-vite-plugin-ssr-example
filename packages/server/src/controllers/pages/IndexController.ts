import {Constant, Controller} from "@tsed/di";
import {HeaderParams} from "@tsed/platform-params";
import {Vite} from "@tsed/vite-ssr-plugin";
import {SwaggerSettings} from "@tsed/swagger";
import {Get, Hidden, Returns} from "@tsed/schema";

@Hidden()
@Controller("/")
export class IndexController {
  @Constant("swagger")
  private swagger: SwaggerSettings[];

  @Get("/")
  @Vite()
  @(Returns(200, String).ContentType("text/html"))
  get(@HeaderParams("x-forwarded-proto") protocol: string, @HeaderParams("host") host: string) {
    const hostUrl = `${protocol || "http"}://${host}`;

    return {
      docs: this.swagger.map((conf) => {
        return {
          url: hostUrl + conf.path,
          ...conf
        };
      })
    };
  }
}
