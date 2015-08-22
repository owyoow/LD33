LD33.Preload = function (game)
{
    
};

LD33.Preload.prototype = {
    
    preload: function ()
    {
        this.load.image('tiles', 'assets/images/tiles.png');
        this.load.atlasJSONHash('sheet', 'assets/images/sheet.png', 'assets/images/sheet.json');
        this.time.advancedTiming = true;
    },
    
    create: function ()
    {
        this.state.start('game');
    }
};