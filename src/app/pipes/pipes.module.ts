import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
// import { InformePipe } from './informe.pipe';
import { DocinformePipe } from './docinforme.pipe';
import { DataPipe } from './data.pipe';


@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    DocinformePipe,
    DataPipe
  ],
  exports: [
    ImagenPipe,
    DocinformePipe,
    DataPipe
  ]
})
export class PipesModule { }
