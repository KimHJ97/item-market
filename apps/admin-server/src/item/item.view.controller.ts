import { Controller, Get, Render } from '@nestjs/common';

@Controller('items')
export class ItemViewController {
  @Get()
  @Render('home')
  itemView() {
    return {
      message: '헬로',
    };
  }
}
