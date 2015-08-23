var LD33 = {

    TILESIZE: 32,
    MONSTER_SPEED: 212,
    MAN_MIN_WALK_SPEED: 35,
    MAN_MAX_WALK_SPEED: 85,
    MAN_RUN_SPEED: 130
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