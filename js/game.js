/*global LD33 Phaser*/

LD33.Game = function (game)
{
    
};

LD33.Game.prototype = {
    
    create: function ()
    {

    },
    
    update: function ()
    {
        
    },
    
    render: function ()
    {
        this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00');
    }
};