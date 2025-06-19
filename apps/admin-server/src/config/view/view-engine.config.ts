import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LayoutMiddleware implements NestMiddleware {
  use(this: void, req: Request, res: Response, next: NextFunction) {
    const originalUrl = req.originalUrl ?? '';
    const isAuthRoute = originalUrl.startsWith('/auth');
    const isPopupRoute = originalUrl.startsWith('/popup');

    if (isAuthRoute) {
      res.locals.layout = 'none';
    } else if (isPopupRoute) {
      res.locals.layout = 'none';
    } else {
      res.locals.layout = 'default';
    }

    next();
  }
}

export function setupViewEngine(app: NestExpressApplication): void {
  app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      layoutsDir: join(__dirname, '..', '..', '..', 'views/layouts'),
      partialsDir: join(__dirname, '..', '..', '..', 'views/partials'),
      defaultLayout: 'default',
      helpers: {
        toUpperCase: (str: string) => str.toUpperCase(),
        equals: (a: any, b: any) => a === b,
      },
    }),
  );

  app.setBaseViewsDir(join(__dirname, '..', '..', '..', 'views/pages'));
  app.setViewEngine('hbs');

  // LayoutMiddleware 등록
  app.use(new LayoutMiddleware().use);
}
