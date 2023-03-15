import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupMenuComponent } from './create-group-menu.component';

describe('CreateGroupMenuComponent', () => {
  let component: CreateGroupMenuComponent;
  let fixture: ComponentFixture<CreateGroupMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
