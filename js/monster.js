LD33.Monster = function (game, gameInput, x, y, state)
{
	Phaser.Sprite.call(this, game, x, y, 'sheet', 'monsterDown.png');

	this.game.add.existing(this);
	this.gameInput = gameInput;
	this.state = state;

	this.anchor.setTo(0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.facingDirection = 'down';
    this.firstInput = 'none';

    this.animations.add('down', ['monsterDown.png'], 20, false);
    this.animations.add('up', ['monsterUp.png'], 20, false);
    this.animations.add('left', ['monsterLeft.png'], 20, false);
    this.animations.add('right', ['monsterRight.png'], 20, false);
    this.animations.add('downHit', ['monsterDown.png', 'monsterDownHit.png'], 10, true);
    this.animations.add('upHit', ['monsterUp.png', 'monsterUpHit.png'], 10, true);
    this.animations.add('leftHit', ['monsterLeft.png', 'monsterLeftHit.png'], 10, true);
    this.animations.add('rightHit', ['monsterRight.png', 'monsterRightHit.png'], 10, true);

    this.health = 4;

    this.hasBeenHit = false;
    this.invincibleTime = 2000;
    this.invincibleTimer = 0

    this.canScare = true;
    this.scareTimeOut = 2000;
    this.scareCounter;

    this.scareTime = 500;
    this.scareTimer;

    this.scare;

};

LD33.Monster.prototype = Object.create(Phaser.Sprite.prototype);
LD33.Monster.prototype.constructor = LD33.Monster;

LD33.Monster.prototype.update = function ()
{
    if(this.scare)
    {
        this.scare.x = this.x;
        this.scare.y = this.y;
    }

    this.game.physics.arcade.collide(this, this.state.mapLayer);
    this.game.physics.arcade.overlap(this, this.state.manGroup, this.hitEnemy, null, this);

    if(this.invincibleTimer < this.game.time.now && this.hasBeenHit)
    {
        this.hasBeenHit = false;
        this.setDirection(this.facingDirection, false);
    }
	this.body.velocity.x = 0;
    this.body.velocity.y = 0;

	if(this.gameInput.left)
    {
        this.body.velocity.x = -LD33.MONSTER_SPEED;
        if(this.firstInput === 'none' || this.firstInput === 'right')
        {
            this.facingDirection = 'left';
        	this.setDirection(this.facingDirection, true);
        }
        
    }
    else if(this.gameInput.right)
    {
        this.body.velocity.x = LD33.MONSTER_SPEED;
        if(this.firstInput === 'none' || this.firstInput === 'left')
        {
            this.facingDirection = 'right';
            this.setDirection(this.facingDirection, true);
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
            this.facingDirection = 'up';
            this.setDirection(this.facingDirection, true);
        }
    }
    else if(this.gameInput.down)
    {
        this.body.velocity.y = LD33.MONSTER_SPEED;
        if(this.firstInput === 'none' || this.firstInput === 'up')
        {
            this.facingDirection = 'down';
            this.setDirection(this.facingDirection, true);
        }
    }
    else
    {
        if(this.firstInput === 'up' || this.firstInput === 'down')
        {
            this.firstInput = 'none';
        }
    }

    if(this.gameInput.scare && this.canScare)
    {
        this.startScare();
    }

    if(this.canScare)
    {
        return;
    }

    if(this.scareTimer < this.game.time.now && this.scare != null)
    {
        this.scare.kill();
    }

    if(this.scareCounter < this.game.time.now)
    {
        this.canScare = true;
    }
};

LD33.Monster.prototype.setDirection = function (dir, fromInput)
{
    if(dir === 'down')
    {
        if(this.hasBeenHit)
        {
            this.animations.play('downHit');
        }
        else
        {
            this.animations.play('down');
        }

        if(fromInput)
        {
            this.firstInput = 'down';
        }
    }
    else if(dir === 'up')
    {
         if(this.hasBeenHit)
        {
            this.animations.play('upHit');
        }
        else
        {
            this.animations.play('up');
        }

        if(fromInput)
        {
            this.firstInput = 'up';
        }
    }
    else if(dir === 'left')
    {
         if(this.hasBeenHit)
        {
            this.animations.play('leftHit');
        }
        else
        {
            this.animations.play('left');
        }

        if(fromInput)
        {
            this.firstInput = 'left';
        }
    }
    else if(dir === 'right')
    {
         if(this.hasBeenHit)
        {
            this.animations.play('rightHit');
        }
        else
        {
            this.animations.play('right');
        }

        if(fromInput)
        {
            this.firstInput = 'right';
        }
    }
};

LD33.Monster.prototype.startScare = function ()
{
    this.canScare = false;
    this.scare = this.state.screamGroup.getFirstExists(false);
    this.scare.reset(this.x, this.y);
    this.scareCounter = this.game.time.now + this.scareTimeOut;
    this.scareTimer = this.game.time.now + this.scareTime;
}

LD33.Monster.prototype.hitEnemy = function (sprite1, sprite2)
{
    if(this.hasBeenHit)
    {
        return;
    }
    this.health--;
    this.state.updateHearts();

    if(this.health <= 0)
    {
        this.game.state.restart();
    }
    this.hasBeenHit = true;
    this.invincibleTimer = this.game.time.now + this.invincibleTime;
    this.setDirection(this.facingDirection, false);
};

