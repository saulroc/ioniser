import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

interface Score {
  username: string,  
  score: number,
  datetime: string
}
@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.page.html',
  styleUrls: ['./high-score.page.scss'],
})
export class HighScorePage implements OnInit {
  
  highScores: any;
  public firebaseService: FirebaseService;
  
  constructor(public af: AngularFirestore) {
    this.firebaseService = new FirebaseService(af);      
    this.highScores = this.firebaseService.getScores();
   }

  ngOnInit() {
  }

}
