import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostEditComponent } from './single-post-edit.component';

describe('SinglePostEditComponent', () => {
  let component: SinglePostEditComponent;
  let fixture: ComponentFixture<SinglePostEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePostEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
