import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CoreModule } from './core/core.module';
import { Observable } from 'rxjs';
import { LoaderService } from './core/services/loader/loader.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoreModule,RouterOutlet, ProgressSpinnerModule],
  providers:[DialogService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit  {
  showLoading$: Observable<boolean> = this.loaderService.showLoading$;
  constructor(
    private cd: ChangeDetectorRef,
    public loaderService: LoaderService,
    private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
