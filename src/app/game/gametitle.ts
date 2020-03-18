import * as Phaser from 'phaser-ce';

export class GameTitle extends Phaser.State {
    
    title : Phaser.Text;
    startLabel : Phaser.Text;

    create() {
        this.game.stage.backgroundColor = '#000000';
        var style = {
            font: 'bold 34pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }
        var message = "Mummies hunter"
        this.title = this.add.text(this.game.world.centerX, this.game.world.centerY, message, style);
        this.title.anchor.set(0.5);

        message = "click here to start game!";
        style.font = '26pt Arial';
        this.startLabel = this.add.text(this.game.world.centerX, this.game.world.centerY + this.title.height * 2, message, style);
        this.startLabel.anchor.set(0.5);
        this.startLabel.inputEnabled = true;
        this.startLabel.events.onInputDown.add(this.startGame, this);
    }

    startGame() {
        this.game.state.start('Main', true);
    }

    update () {
        
    }
}