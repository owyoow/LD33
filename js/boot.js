var LD33 = {

    TILESIZE: 64,
    MONSTER_SPEED: 185
};

LD33.Boot = function (game)
{
    
};

LD33.Boot.prototype = {
    
    preload: function ()
    {
        this.scale.pageAlignHorizontally = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);
    },
    
    create: function ()
    {
        this.state.start('preload');
    }
};