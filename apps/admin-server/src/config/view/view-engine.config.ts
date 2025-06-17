import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';

export function setupViewEngine(app: NestExpressApplication): void {
  app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      layoutsDir: join(__dirname, '..', '..', '..', 'views/layouts'),
      partialsDir: join(__dirname, '..', '..', '..', 'views/partials'),
      defaultLayout: 'main',
      helpers: {
        toUpperCase: (str: string) => str.toUpperCase(),
        equals: (a: any, b: any) => a === b,
      },
    }),
  );

  app.setBaseViewsDir(join(__dirname, '..', '..', '..', 'views/pages'));
  app.setViewEngine('hbs');
}
