import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { ITourClient } from '../../models/ITourClient';
import { TourDto } from '../../dto/tour.dto';
import { ToursService } from '../../services/tours/tours.service';

@Controller('tour-item')
export class TourItemController {
  static imgName: string;

  constructor(private readonly toursService: ToursService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './public/',
        filename: (req, file, callback) => {
          const imgType = file.mimetype.split('/');
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const imgName = file.filename + '-' + uniqueSuffix + '.' + imgType[1];

          TourItemController.imgName = imgName;
          callback(null, imgName);
        },
      }),
    }),
  )
  async initTours(
    @Body() body: ITourClient,
    @UploadedFile() file,
  ): Promise<TourDto> {
    console.log(body);
    console.log(file);
    body.img = TourItemController.imgName;
    return this.toursService.uploadTour(body);
  }
}
