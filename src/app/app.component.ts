import {
  AfterViewInit,

  ChangeDetectorRef,

  Component,
  inject,

  OnInit,

} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { CoreModule } from './core/core.module';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { Observable } from 'rxjs';
import { LoaderService } from './core/services/loader/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [CoreModule, RouterOutlet, LoaderComponent,ToastModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  loaderService = inject(LoaderService);
  showLoading$: Observable<boolean> = this.loaderService.showLoading$;
  constructor(
    private cdref: ChangeDetectorRef,
    private primengConfig: PrimeNGConfig
  ) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.cdref.detectChanges();
  }
  ngAfterViewInit(): void {
     this.cdref.detectChanges();
  }
}
