LD33.CreateMap = function (game)
{
	this.game = game;
	this.mapArray = [];
	this.mapWidth = 0;
	this.mapHeight = 0;
};

LD33.CreateMap.prototype.buildMap = function (width, height, rndWalls)
{
	this.mapWidth = width;
	this.mapHeight = height;
	
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
        this.mapArray.push(array);
    }

    this.addRandomWalls(rndWalls);

    var csvString = '';
    for(row = 0; row < height; row++)
    {
        for(column = 0; column < width; column++)
        {
            csvString += this.mapArray[row][column].toString();
            csvString += ",";
        }
        csvString = csvString.replace(/,\s*$/, "");
        csvString += '\n';
    }
    
    return csvString;
};

LD33.CreateMap.prototype.addRandomWalls = function (nrOfWalls)
{
	for(var i = 0; i < nrOfWalls; i++)
	{
		var floorFound = false;
		while(!floorFound)
		{
			var randomX = this.game.rnd.integerInRange(1, this.mapWidth - 2);
            var randomY = this.game.rnd.integerInRange(1, this.mapHeight - 2);
            if(this.mapArray[randomY][randomX] === 0)
            {
             	floorFound = true;
             	this.mapArray[randomY][randomX] = 1;
            }
		}
	}
};