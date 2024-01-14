import { Injectable } from '@angular/core';
import { AutheticationService } from '../authetication.service';
import { Observable } from 'rxjs';
import { ApiService } from './api/api.service';
import { Firestore, collection, query, where, getDocs, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  currentUserId: string;
  public users : Observable<any>;
  constructor(public auth: AutheticationService, private api:ApiService, private firestore: Firestore) { 
    this.getId();
  }
  getId(){
    this.currentUserId = this.auth.getId();
  }
  getUsers(){
    this.users = this.api.collectionDataQuery(
      'users',
      this.api.whereQuery('uid','!=', this.currentUserId)
    );
  }
  sendMessageToRoom(chatRoomId: string, message: string): Promise<any> {
    const collectionPath = `chatRooms/${chatRoomId}/messages`;
    const messageData = {
      sender: this.currentUserId,
      content: message,
      timestamp: new Date().toISOString(),
    };

    return this.api.addDocument(collectionPath, messageData);
  }

  createChatRoom(user: any): Promise<string> {
    // Create a chat room document in Firestore and return its ID
    // Replace 'chatRooms' with your actual Firestore collection for chat rooms
    const collectionPath = 'chatRooms';

  // Generate a random ID for the chat room
  const RoomId = this.generateRandomId();
    const chatRoomData = {
      chatRoomId: RoomId,
      namee : user.name,
      // Add more properties as needed
    };

    return this.api.addDocument(collectionPath, chatRoomData).then((docRef) => docRef.id);
  }
  generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  getChatRoomIdByName(userName: string): Promise<string | undefined> {
    const collectionPath = 'chatRooms';
    const queryRef = query(collection(this.firestore, collectionPath), where('name', '==', userName));

    return getDocs(queryRef).then((snapshot) => {
      if (snapshot.empty) {
        return undefined;
      } else {
        return snapshot.docs[0].id;
      }
    });
  }
}
