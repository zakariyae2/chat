import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBoxPage } from './chat-box.page';

describe('ChatBoxPage', () => {
  let component: ChatBoxPage;
  let fixture: ComponentFixture<ChatBoxPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
