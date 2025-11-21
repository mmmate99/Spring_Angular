import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoEmbed } from './demo-embed';

describe('DemoEmbed', () => {
  let component: DemoEmbed;
  let fixture: ComponentFixture<DemoEmbed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoEmbed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoEmbed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
