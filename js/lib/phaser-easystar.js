/*global Phaser EasyStar*/
Phaser.Plugin.PhaserStarPlugin = function (parent)
{
    if(typeof EasyStar !== 'object')
    {
        throw new Error('EasyStar not found!');
    }
    
    this.parent = parent;
    this.pEasyStar = new EasyStar.js();
    this.pGrid = null;
    this.pCallback = null;
    this.pPrepared = false;
    this.pWalkables = [0];
};

Phaser.Plugin.PhaserStarPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.PhaserStarPlugin.prototype.constructor = Phaser.Plugin.PhaserStarPlugin;

Phaser.Plugin.PhaserStarPlugin.prototype.enableSync = function ()
{
    this.pEasyStar.enableSync();
};

Phaser.Plugin.PhaserStarPlugin.prototype.disableSync = function ()
{
    this.pEasyStar.disableSync();
};

Phaser.Plugin.PhaserStarPlugin.prototype.enableDiagonals = function ()
{
    this.pEasyStar.enableDiagonals();
};

Phaser.Plugin.PhaserStarPlugin.prototype.disableDiagonals = function ()
{
    this.pEasyStar.disableDiagonals();
};

Phaser.Plugin.PhaserStarPlugin.prototype.setGrid = function (grid, walkables, iterationsPerCalculation)
{
    iterationsPerCalculation = iterationsPerCalculation || null;
    
    this.pGrid = [];
    for(var i = 0; i < grid.length; i++)
    {
        this.pGrid[i] = [];
        for(var j = 0; j < grid[i].length; j++)
        {
            if(grid[i][j])
            {
                this.pGrid[i][j] = grid[i][j].index;
            }
            else
            {
                this.pGrid[i][j] = 0;
            }
        }
    }
    
    this.pWalkables = walkables;
    
    this.pEasyStar.setGrid(this.pGrid);
    this.pEasyStar.setAcceptableTiles(this.pWalkables);
    
    for(i = 0; i < walkables.length; i++)
    {
        this.setTileCost(walkables[i], 1);
    }
    
    if(iterationsPerCalculation !== null)
    {
        this.pEasyStar.setIterationsPerCalculation(iterationsPerCalculation);
    }
};

Phaser.Plugin.PhaserStarPlugin.prototype.setTileCost = function (tileType, cost)
{
    this.pEasyStar.setTileCost(tileType, cost);
};

Phaser.Plugin.PhaserStarPlugin.prototype.setAdditionalPointCost = function (tileX, tileY, cost)
{
    this.pEasyStar.setAdditionalPointCost(tileX, tileY, cost);
};

Phaser.Plugin.PhaserStarPlugin.prototype.removeAdditionalPointCost = function (tileX, tileY)
{
    this.pEasyStar.removeAdditionalPointCost(tileX, tileY);
};

Phaser.Plugin.PhaserStarPlugin.prototype.removeAllAdditionalPointCosts = function ()
{
    this.pEasyStar.removeAllAdditionalPointCosts();
};

Phaser.Plugin.PhaserStarPlugin.prototype.avoidAdditionalPoint = function (tileX, tileY)
{
    this.pEasyStar.avoidAdditionalPoint(tileX, tileY);
};

Phaser.Plugin.PhaserStarPlugin.prototype.stopAvoidingAdditionalPoint = function (tileX, tileY)
{
    this.pEasyStar.stopAvoidingAdditionalPoint(tileX, tileY);
};

Phaser.Plugin.PhaserStarPlugin.prototype.stopAvoidingAllAdditionalPoints = function ()
{
    this.pEasyStar.stopAvoidingAllAdditionalPoints();
};

Phaser.Plugin.PhaserStarPlugin.prototype.enableCornerCutting = function ()
{
    this.pEasyStar.enableCornerCutting();
};

Phaser.Plugin.PhaserStarPlugin.prototype.disableCornerCutting = function ()
{
    this.pEasyStar.disableCornerCutting();
};

Phaser.Plugin.PhaserStarPlugin.prototype.setCallbackFunction = function (callback, object)
{
    this.pCallback = callback;
};

Phaser.Plugin.PhaserStarPlugin.prototype.findPath = function (startX, startY, targetX, targetY)
{
    if(this.pCallback === null || typeof this.pCallback !== 'function')
    {
        throw new Error('No Callback set!');
    }
    this.pEasyStar.findPath(startX, startY, targetX, targetY, this.pCallback);
    this.pPrepared = true;
};

Phaser.Plugin.PhaserStarPlugin.prototype.calculatePath = function(useDiagonals, useCornerCutting)
{
    if(this.pPrepared === null)
    {
        throw new Error('findPath should be called first');
    }
    if(useDiagonals === true)
    {
        this.enableDiagonals();
    }
    else
    {
        this.disableDiagonals();
    }
    
    if(useCornerCutting === true)
    {
        this.enableCornerCutting();
    }
    else
    {
        this.disableCornerCutting();
    }
    
    this.pEasyStar.calculate();
};