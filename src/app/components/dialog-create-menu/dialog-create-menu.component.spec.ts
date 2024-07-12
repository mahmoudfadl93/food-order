import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateMenuComponent } from './dialog-create-menu.component';

describe('DialogCreateMenuComponent', () => {
  let component: DialogCreateMenuComponent;
  let fixture: ComponentFixture<DialogCreateMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
