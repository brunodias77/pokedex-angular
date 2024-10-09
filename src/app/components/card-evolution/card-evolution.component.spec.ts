import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEvolutionComponent } from './card-evolution.component';

describe('CardEvolutionComponent', () => {
  let component: CardEvolutionComponent;
  let fixture: ComponentFixture<CardEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEvolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
