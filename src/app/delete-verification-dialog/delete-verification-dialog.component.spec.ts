import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVerificationDialogComponent } from './delete-verification-dialog.component';

describe('DeleteVerificationDialogComponent', () => {
  let component: DeleteVerificationDialogComponent;
  let fixture: ComponentFixture<DeleteVerificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVerificationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
