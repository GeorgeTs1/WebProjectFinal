import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonUploaderComponent } from './json-uploader.component';

describe('JsonUploaderComponent', () => {
  let component: JsonUploaderComponent;
  let fixture: ComponentFixture<JsonUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
