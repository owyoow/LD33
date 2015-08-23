/*global LD33 Phaser*/

LD33.Input = function (game)
{
    this.game = game;
    
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.scare = false;
};

    
LD33.Input.prototype.setupInput = function (game)
{
    var leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(this.leftDown, this);
    leftKey.onUp.add(this.leftUp, this);
    
    var rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(this.rightDown, this);
    rightKey.onUp.add(this.rightUp, this);
    
    var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.upDown, this);
    upKey.onUp.add(this.upUp, this);
    
    var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(this.downDown, this);
    downKey.onUp.add(this.downUp, this);
    
    var scareKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    scareKey.onDown.add(this.scareDown, this);
    scareKey.onUp.add(this.scareUp, this);

    
};
    
LD33.Input.prototype.leftDown = function ()
{
    this.left = true;
};
    
LD33.Input.prototype.leftUp = function ()
{
    this.left = false;
};
    
LD33.Input.prototype.rightDown = function ()
{
    this.right = true;
};
    
LD33.Input.prototype.rightUp = function ()
{
    this.right = false;
};
    
LD33.Input.prototype.upDown = function ()
{
    this.up = true;
};
    
LD33.Input.prototype.upUp = function ()
{
    this.up = false;
};
    
LD33.Input.prototype.downDown = function ()
{
    this.down = true;
};
    
LD33.Input.prototype.downUp = function ()
{
    this.down = false;
};
    
LD33.Input.prototype.scareDown = function ()
{
    this.scare = true;
};
    
LD33.Input.prototype.scareUp = function ()
{
    this.scare = false;
};