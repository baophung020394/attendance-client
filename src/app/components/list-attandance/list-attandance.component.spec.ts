import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttandanceComponent } from './list-attandance.component';

describe('ListAttandanceComponent', () => {
  let component: ListAttandanceComponent;
  let fixture: ComponentFixture<ListAttandanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAttandanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAttandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
