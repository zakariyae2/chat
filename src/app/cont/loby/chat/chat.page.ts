import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { AutheticationService } from 'src/app/authetication.service';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  name: string;
  message: string;
  isLoading = false;
  currentUserId: string;
  chatRoomId: 2;
  chats: any[] = [];

  // Replace this with your actual chatRooms data
  chatRooms: any[] = [];

  constructor( 
    private router: Router,
    private chatService : ChatServiceService,
    private authService: AutheticationService,
    private route: ActivatedRoute
    ) { 
      this.name = this.route.snapshot.queryParams['name'];
    this.currentUserId = this.authService.getId();
    this.chatService.getUsers();
    //this.chatRoomId = this.route.snapshot.queryParams['chatRoomId'];
    }


  ngOnInit() {
    console.log('Chat Room ID:', this.chatRoomId);
  }

  sendMessage() {
    if (this.message.trim() === '') {
      return; // Don't send empty messages
    }
  
    this.isLoading = true;
  
    // Get the user's name from the query parameters
    const userName = this.route.snapshot.queryParams['name'];
  
    // Fetch the chat room ID based on the user's name
    this.chatService.getChatRoomIdByName(userName).then((chatRoomId) => {
      if (!chatRoomId) {
        console.error('Chat room ID not found.');
        this.isLoading = false;
        return;
      }
  
      // Send the message to the chat room
      this.chatService.sendMessageToRoom(chatRoomId, this.message).then(
        (response: any) => {
          // Handle success
          console.log('Message sent successfully:', response);
          this.message = ''; // Clear the input field after sending
        },
        (error: any) => {
          // Handle error
          console.error('Error sending message:', error);
        }
      ).finally(() => {
        this.isLoading = false;
      });
    });
  }
}
