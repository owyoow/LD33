LD33.Game = function (game)
{
    
};

LD33.Game.prototype = {
    
    create: function ()
    {
        this.gameInput = new LD33.Input(this);
        this.gameInput.setupInput();

        var mapString = this.generateRoom(16, 12);
        this.load.tilemap('map', null, mapString, Phaser.Tilemap.CSV);

        this.map = this.add.tilemap('map', LD33.TILESIZE, LD33.TILESIZE);
        this.map.addTilesetImage('tiles');
        this.mapLayer = this.map.createLayer(0);
        this.mapLayer.resizeWorld();
        this.map.setCollisionBetween(1, 1);

        this.monster = new LD33.Monster(this.game, this.gameInput, 100, 100, this.state);

        this.camera.follow(this.monster, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    },
    
    update: function ()
    {
        this.physics.arcade.collide(this.monster, this.mapLayer);
    },
    
    render: function ()
    {
        this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00');

        //this.game.debug.body(this.monster);
    },

    generateRoom: function (width, height)
    {
        var mapArray = [];

        for(var row = 0; row < height; row++)
        {
            var array = [];
            for(var column = 0; column < width; column++)
            {
                if(column === 0 || column === width - 1 || row === 0 || row === height - 1)
                {
                    array.push(1);
                }
                else
                {
                    array.push(0);
                }
            }
            mapArray.push(array);
        }

        var csvString = '';
        for(row = 0; row < height; row++)
        {
            for(column = 0; column < width; column++)
            {
                csvString += mapArray[row][column].toString();
                csvString += ",";
            }
            csvString = csvString.replace(/,\s*$/, "");
            csvString += '\n';
        }
        
        return csvString;
    }
};