LD33.Monster = function (game, gameInput, x, y, state)
{
	Phaser.Sprite.call(this, game, x, y, 'sheet', 'monsterDown.png');

	this.game.add.existing(this);
	this.gameInput = gameInput;
	this.state = state;

	this.anchor.setTo(0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.firstInput = "none";

    this.animations.add('down', ['monsterDown.png'], 20, false);
    this.animations.add('up', ['monsterUp.png'], 20, false);
    this.animations.add('left', ['monsterLeft.png'], 20, false);
    this.animations.add('right', ['monsterRight.png'], 20, false);
};

LD33.Monster.prototype = Object.create(Phaser.Sprite.prototype);
LD33.Monster.prototype.constructor = LD33.Monster;

LD33.Monster.prototype.update = function ()
{
	this.body.velocity.x = 0;
    this.body.velocity.y = 0;

	if(this.gameInput.left)
    {
        this.body.velocity.x = -LD33.MONSTER_SPEED;
        if(this.firstInput === 'none' || this.firstInput === 'right')
        {
        	this.animations.play('left');
            this.firstInput = 'left';
        }
        
    }
    else if(this.gameInput.right)
    {
        this.body.velocity.x = LD33.MONSTER_SPEED;
        if(this.firstInput === 'none' || this.firstInput === 'left')
        {
            this.animations.play('right');
            this.firstInput = 'right';
        }
    }
    else
    {
        if(this.firstInput === 'left' || this.firstInput === 'right')
        {
            this.firstInput = 'none';
        }
    }
    
    if(this.gameInput.up)
    {
        this.body.velocity.y = -LD33.MONSTER_SPEED;
        if(this.firstInput === 'none' || this.firstInput === 'down')
        {
            this.animations.play('up');
            this.firstInput = 'up';
        }
    }
    else if(this.gameInput.down)
    {
        this.body.velocity.y = LD33.MONSTER_SPEED;
        if(this.firstInput === 'none' || this.firstInput === 'up')
        {
            this.animations.play('down');
            this.firstInput = 'down';
        }
    }
    else
    {
        if(this.firstInput === 'up' || this.firstInput === 'down')
        {
            this.firstInput = 'none';
        }
    }
};

LD33.Monster.prototype.changeBody = function (vertical)
{
    if(vertical && !this.isVertical)
    {
        this.isVertical = true;
        this.body.setSize(16, 35, 0, 0);
    }
    else if(!vertical && this.isVertical)
    {
        this.isVertical = false;
        this.body.setSize(35, 16, 0, 0);
    }
};