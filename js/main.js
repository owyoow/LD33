/*global Phaser LD33*/

window.onload = function ()
{
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameContainer');
    
    game.state.add('boot', LD33.Boot);
    game.state.add('preload', LD33.Preload);
    game.state.add('game', LD33.Game);
    
    game.state.start('boot');
};