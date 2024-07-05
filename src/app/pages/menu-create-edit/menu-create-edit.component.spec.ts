import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCreateEditComponent } from './menu-create-edit.component';

describe('MenuCreateEditComponent', () => {
  let component: MenuCreateEditComponent;
  let fixture: ComponentFixture<MenuCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
