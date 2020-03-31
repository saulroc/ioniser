import * as Phaser from 'phaser-ce';
import { FirebaseService } from '../services/firebase.service';

export class PreLoad extends Phaser.State {
    
    private firebaseService: FirebaseService;
    private playerName: string;

    init(fs: FirebaseService, pn: string) {
        this.firebaseService = fs;
        this.playerName = pn;
    }
    preload() {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.game.load.image('lazur', 'assets/thorn_lazur.png');
        this.game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
        //this.game.load.spritesheet('explosion', 'assets/explosion_HD.png', 84, 84, 21);
        this.game.load.spritesheet('explosion', 'assets/Explosion.png', 33, 45, 24);
        this.game.load.audio('music_loop', 'assets/06 - Another Part Of Me.mp3');
    }
    create() {
       
        this.game.state.start('GameTitle', false, false, this.firebaseService, this.playerName);
    }

}