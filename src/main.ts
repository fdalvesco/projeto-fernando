import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("User Management API")
    .setDescription("API documentation for the user management system")
    .setVersion("1.0")
    .addTag("users")
    .addTag("comments")
    .addTag("posts")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document); 

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setViewEngine("hbs");

  await app.listen(process.env.PORT);

  console.log(`Using port ${process.env.PORT}`);
}
bootstrap();
