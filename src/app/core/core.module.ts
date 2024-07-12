import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { loaderInterceptor } from './services/interceptor/loader/loader.interceptor';
import { LoaderService } from './services/loader/loader.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [

  ],
  exports:[CommonModule]
})
export class CoreModule {}
