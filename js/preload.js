LD33.Preload = function (game)
{
    
};

LD33.Preload.prototype = {
    
    preload: function ()
    {
        this.load.image('tiles', 'assets/images/tileshalf.png');
        this.load.atlasJSONHash('sheet', 'assets/images/sheethalf.png', 'assets/images/sheethalf.json');
        this.time.advancedTiming = true;
    },
    
    create: function ()
    {
        this.state.start('game');
    }
};