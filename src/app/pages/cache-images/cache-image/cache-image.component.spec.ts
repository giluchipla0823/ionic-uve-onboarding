/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CacheImageComponent } from './cache-image.component';

describe('CacheImageComponent', () => {
  let component: CacheImageComponent;
  let fixture: ComponentFixture<CacheImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacheImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
