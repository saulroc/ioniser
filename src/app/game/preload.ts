import * as Phaser from 'phaser-ce';

export class PreLoad extends Phaser.State {
    
    preload() {
        this.game.load.image('lazur', 'assets/thorn_lazur.png');
        this.game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
    }
    create() {
       
        this.game.state.start('GameTitle');
    }

}