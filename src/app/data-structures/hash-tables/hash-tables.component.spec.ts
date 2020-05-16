import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashTablesComponent } from './hash-tables.component';

describe('HashTablesComponent', () => {
  let component: HashTablesComponent;
  let fixture: ComponentFixture<HashTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
