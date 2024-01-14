import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.page.html',
  styleUrls: ['./chat-box.page.scss'],
})
export class ChatBoxPage implements OnInit {
  @Input() chat: any;
  @Input() current_user_id : any;

  constructor() { }

  ngOnInit() {}

}
