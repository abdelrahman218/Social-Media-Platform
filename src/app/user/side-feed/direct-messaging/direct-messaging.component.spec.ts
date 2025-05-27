import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessagingComponent } from './direct-messaging.component';

describe('DirectMessagingComponent', () => {
  let component: DirectMessagingComponent;
  let fixture: ComponentFixture<DirectMessagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectMessagingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
