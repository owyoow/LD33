/*global LD33*/

LD33.Preload = function (game)
{
    
};

LD33.Preload.prototype = {
    
    preload: function ()
    {
        
        this.time.advancedTiming = true;
    },
    
    create: function ()
    {
        this.state.start('game');
    }
};