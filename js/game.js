LD33.Game = function (game)
{
    
};

LD33.Game.prototype = {
    
    create: function ()
    {
        this.gameInput = new LD33.Input(this);
        this.gameInput.setupInput();

        this.createMap = new LD33.CreateMap(this);

        var mapString = this.createMap.buildMap(50, 30, 50);
        this.load.tilemap('map', null, mapString, Phaser.Tilemap.CSV);

        this.map = this.add.tilemap('map', LD33.TILESIZE, LD33.TILESIZE);
        this.map.addTilesetImage('tiles');
        this.mapLayer = this.map.createLayer(0);
        this.mapLayer.resizeWorld();

        this.map.setCollisionBetween(1, 1);

        this.phaserStar = this.add.plugin(Phaser.Plugin.PhaserStarPlugin);
        this.phaserStar.setGrid(this.map.layers[0].data, 0);

        var playerPos = new Phaser.Point(0, 0);
        var emptySpot = false;
        while(!emptySpot)
        {
                var randomX = this.rnd.integerInRange(1, this.map.width - 2);
                var randomY = this.rnd.integerInRange(1, this.map.height - 2);
                if(this.createMap.mapArray[randomY][randomX] === 0)
                {
                    playerPos.x = randomX * this.map.tileWidth + this.map.tileWidth * 0.5;
                    playerPos.y = randomY * this.map.tileHeight + this.map.tileHeight * 0.5;
                    emptySpot = true;
                }
        }

        this.manGroup = this.add.group();
        var manPos = new Phaser.Point(0, 0);
        for(var i = 0; i < 20; i++)
        {
            emptySpot = false;
            while(!emptySpot)
            {
                randomX = this.rnd.integerInRange(1, this.map.width - 2);
                randomY = this.rnd.integerInRange(1, this.map.height - 2);
                if(this.createMap.mapArray[randomY][randomX] === 0)
                {
                    manPos.x = randomX * this.map.tileWidth + this.map.tileWidth * 0.5;
                    manPos.y = randomY * this.map.tileHeight + this.map.tileHeight * 0.5;
                    emptySpot = true;
                    if(Math.abs(manPos.x - playerPos.x) < 8 * LD33.TILESIZE || Math.abs(manPos.y - playerPos.y) < 8 * LD33.TILESIZE)
                    {
                        emptySpot = false;
                    }
                    this.manGroup.forEach(function (man) {
                        if(manPos.x === man.x && manPos.y === man.y)
                        {
                            emptySpot = false;
                        }
                    }, this);
                }
            }
            var man = new LD33.Man(this.game, manPos.x, manPos.y, this);
            this.manGroup.add(man);
        }

        this.monster = new LD33.Monster(this.game, this.gameInput, playerPos.x, playerPos.y, this);

        this.camera.follow(this.monster, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    },
    
    update: function ()
    {

    },
    
    render: function ()
    {
        this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00');

        //this.game.debug.body(this.monster);
    }
};