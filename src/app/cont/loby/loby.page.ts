import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs  } from "firebase/firestore";
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { AutheticationService } from 'src/app/authetication.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loby',
  templateUrl: './loby.page.html',
  styleUrls: ['./loby.page.scss'],
})
export class LobyPage implements OnInit {
  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController;
  segment = 'chats';
  open_new_chat = false;
  users:Observable<any[]>;
  /*users = [
    {id: 1, name: 'NIkhil', photo: 'https://i.pravatar.cc/315'},
    {id: 2, name: 'XYZ', photo: 'https://i.pravatar.cc/325'},
  ];*/
  chatRooms : any[] = [];

  constructor(
    private router: Router,
    private chatService : ChatServiceService,
    private authService: AutheticationService
  ) { }

  async fetchCountries() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, 'users'));

    this.chatRooms = [];
    querySnapshot.forEach((doc) => {
      const countryData = {
        id: doc.data()['uid'],
        name: doc.data()['name'],
        image: doc.data()['image'],
      };
      this.chatRooms.push(countryData);
    });
  }
  async ngOnInit() {
    this.fetchCountries();
  }
  handleImageError(event: any, defaultImagePath: string) {
    // Set the source to the default image path
    event.target.src = defaultImagePath;
  }

  async logout() {
    try {
      await this.authService.signOut();
      // Navigate to the sign-in or home page
      this.router.navigate(['/home']); // Replace '/signin' with the path you want
      console.log('User signed out successfully.');
    } catch (error) {
      console.error('Error during sign-out:', error);
      // Handle errors, if any
    }
  }

  onSegmentChanged(event: any) {
    console.log(event);
  }

  newChat() {
    this.open_new_chat = true;
    if(!this.users) this.getUsers();
  }
  getUsers(){
    this.chatService.getUsers();
    this.users= this.chatService.users;
  }

  onWillDismiss(event: any) {}

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }

  startChat(item: any) {
    // Create a chat room and get its ID
    this.chatService.createChatRoom(item).then((chatRoomId) => {
      // Navigate to the chat page with the chat room ID
      this.router.navigate(['/', 'loby', 'chats', chatRoomId]);
    });
  }

  getChat(item : any) {
    for (const chatRoom of this.chatRooms) {
      if (chatRoom.id === item?.id) {
        this.router.navigate(['/', 'loby', 'chats', chatRoom.id], { queryParams: { name: item.name } });
        break; // exit the loop once the item is found
      }
    }
  }
}
