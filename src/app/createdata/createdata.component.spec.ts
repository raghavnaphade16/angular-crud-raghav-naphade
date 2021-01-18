import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedataComponent } from './createdata.component';

describe('CreatedataComponent', () => {
  let component: CreatedataComponent;
  let fixture: ComponentFixture<CreatedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
