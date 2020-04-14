import * as Phaser from 'phaser-ce';
import { FirebaseService } from '../services/firebase.service';
import { PrisonerOfWar } from './prisonerOfWar';
import { Mummy } from './mummy';

export class GameTitle extends Phaser.State {
    
    title : Phaser.Text;
    startLabel : Phaser.Text;
    instructionsLabel : Phaser.Text;
    private firebaseService: FirebaseService;
    private playerName: string = 'Player 1';
    private page: number = 0;
    private pow: PrisonerOfWar;
    private mummy: Mummy;

    init(fs: FirebaseService, pn: string) {
        this.firebaseService = fs;
        this.playerName = pn;
    }

    create() {
        this.game.stage.backgroundColor = '#000000';
        var style = {
            font: 'bold 34pt Arial',
            fill: '#FFFFFF',
            align: 'center',
            wordWrap: true, 
            wordWrapWidth: this.game.width / 4 * 3
        }
        var message = "Mummies hunter ";
        this.title = this.add.text(this.game.world.centerX, this.game.world.centerY / 8, message, style);
        this.title.anchor.set(0.5);

        message = "click here to skip demo and start game!";
        style.font = '13pt Arial';
        this.startLabel = this.add.text(this.game.world.centerX, this.title.y + this.title.height, message, style);
        this.startLabel.anchor.set(0.5);
        this.startLabel.inputEnabled = true;
        this.startLabel.events.onInputDown.add(this.startGame,this);
        
        style.font = '18pt Arial';
        message = "click here to skip demo and start game!";
        this.instructionsLabel = this.add.text(this.game.world.centerX, this.startLabel.y + 2 * this.startLabel.height, "Hello " + this.playerName + "! click here to read the game instructions", style);
        this.instructionsLabel.anchor.set(0.5);
        this.instructionsLabel.inputEnabled = true;
        this.instructionsLabel.events.onInputDown.add(this.showInstructions, this);        
    }

    writeInstructions(message: string) {
        var words = message.split(" ");
        this.instructionsLabel.text = "";
        words.forEach(element => {
            this.instructionsLabel.text += element + " ";            
        });
    }

    resetDemoScreen() {
        if(this.pow) {
            if (this.pow.animations.currentAnim)
                this.pow.animations.currentAnim.onComplete.halt();
            this.pow.destroy();
        }
        
        if(this.mummy && this.mummy.events && this.mummy.events.onInputDown) {
            this.mummy.events.onInputDown.halt();
        }
        this.showInstructions();
    }

    showInstructions() {
        this.page++;
        switch (this.page) {
            case 1:
                this.writeInstructions("Tap on the Prisoner Of War to free him!");
                this.pow = new PrisonerOfWar(this.game);
                this.pow.position.x = this.game.world.centerX;
                this.pow.position.y = this.game.world.centerY;                
                this.pow.animEscape.onComplete.addOnce(this.resetDemoScreen, this, 10);
                break;
            case 2:
                this.writeInstructions("Drag and drop the POW to save him from the mummies!");
                if (this.pow)
                    this.pow.destroy();

                this.pow = new PrisonerOfWar(this.game);

                this.pow.position.x = this.game.world.centerX;
                this.pow.position.y = this.game.world.centerY;
                this.pow.freeOnTap();
                this.pow.animFlying.onComplete.addOnce(this.resetDemoScreen, this, 10);
                break;
            case 3:
                this.writeInstructions("Tap on the mummies to kill them!");
                this.mummy = new Mummy(this.game);
                this.mummy.position.x = this.game.world.centerX;
                this.mummy.position.y = this.game.world.centerY;
                this.mummy.events.onDestroy.addOnce(this.resetDemoScreen,this, 1);
                break;
            default:
                this.writeInstructions("Click on the screen to start game!");    
                this.game.input.onTap.addOnce(this.startGame,this);        
                break;
        }
    }

    startGame() {
        this.game.state.start('Main', true, false, true, this.firebaseService, this.playerName);
    }

// render() {
//     if(this.pow) {
//         this.game.debug.spriteInfo(this.pow, 10, 10, 'red');
//         this.game.debug.spriteBounds(this.pow);
//     }
//     if(this.mummy)
//         this.game.debug.spriteBounds(this.mummy);

// }

}