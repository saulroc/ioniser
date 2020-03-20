import * as Phaser from 'phaser-ce';

export class GameOver extends Phaser.State {
    
    finalMessage: Phaser.Text;
    restartText: Phaser.Text;
    private finalMessageText: string = "Game Over!";
    nextLevel: boolean;

    init(message: string, nextLevel: boolean) {
        this.finalMessageText = message;
        this.nextLevel = nextLevel;
    }

    create() {
        var style = {
            font: 'bold 34pt Arial',
            fill: '#FFFFFF',
            align: 'center',
            wordWrap: true, 
            wordWrapWidth: this.game.width / 2
        }        
        this.finalMessage = this.add.text(this.game.world.centerX, this.game.world.centerY, this.finalMessageText, style);
        this.finalMessage.anchor.set(0.5);

        var message = 'Click here to restart!'
        if (this.nextLevel) 
            message = 'Click here to next Level!';

        style.font = "28pt Arial"
        this.restartText = this.add.text(this.game.world.centerX, this.game.world.centerY + this.finalMessage.height * 1.5, message, style);
        this.restartText.anchor.set(0.5);
        this.restartText.inputEnabled = true;
        this.restartText.events.onInputDown.add(this.restartGame, this);
    }

    update () {

    }

    restartGame() {
        this.restartText.setText("");
        this.finalMessage.text = "";
		this.game.state.start("Main",true, false, !this.nextLevel);
	}
}