import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

interface Score {
    username: string,  
    score: number,
    datetime: Date
  }
  
export class FirebaseService {
    public db: AngularFirestore;
    highScoresCollectionRef: AngularFirestoreCollection<Score>;
    highScores: any;
    
    constructor(af: AngularFirestore) {
        this.db = af;
        this.highScoresCollectionRef = af.collection<Score>('scores');
        this.highScores = this.highScoresCollectionRef.valueChanges();
    }

    createScore(value) {
        return this.db.collection<Score>('scores').add({
            username: value.username,
            score: value.score,
            datetime: new Date()
        });
    }

    getScores() {
        
        return this.db.collection<Score>('scores', ref => ref.orderBy('score', 'desc')).valueChanges();                
    }

}