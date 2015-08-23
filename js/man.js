LD33.Man = function (game, x, y, state)
{
	Phaser.Sprite.call(this, game, x, y, 'sheet', 'manDown.png');
	this.game.add.existing(this);
	this.state = state;

	this.anchor.setTo(0.5);
	this.game.physics.enable(this, Phaser.Physics.ARCADE);

	this.animations.add('down', ['manDown.png'], 20, false);
	this.animations.add('up', ['manUp.png'], 20, false);
	this.animations.add('left', ['manLeft.png'], 20, false);
	this.animations.add('right', ['manRight.png'], 20, false);

	this.facingDirection = 'down';
	this.hasPath = false;
	this.path = [];
	this.pathIndex = 1;
	this.currentTarget = new Phaser.Point(0, 0);

	this.currentSpeed = this.game.rnd.integerInRange(LD33.MAN_MIN_WALK_SPEED, LD33.MAN_MAX_WALK_SPEED);
	this.getNewPath();

	this.hadCollision = false;

	this.collisionTimeOut = 300;
	this.collisionTimer = this.game.time.now + this.collisionTimeOut;

	this.maxPointRadius = 10;
	this.attackDistance = 160;

	this.isFollowing = false;
};

LD33.Man.prototype = Object.create(Phaser.Sprite.prototype);
LD33.Man.prototype.constructor = LD33.Man;

LD33.Man.prototype.update = function ()
{
	this.game.physics.arcade.collide(this, this.state.manGroup, this.collision, null, this);
	this.game.physics.arcade.collide(this, this.state.mapLayer);

	var dist = this.game.physics.arcade.distanceBetween(this, this.state.monster);
	var angle = Phaser.Math.radToDeg(this.game.physics.arcade.angleBetween(this, this.state.monster));

	if(dist < this.attackDistance && !this.isFollowing)
	{
		if((this.facingDirection === 'down' && angle > 45 && angle < 135) || (this.facingDirection === 'up' && angle > -135 && angle < -45) ||
		   (this.facingDirection === 'right' && angle > -45 && angle < 45) || (this.facingDirection === 'left') && ((angle > 135 && angle < 180) || (angle > -180 && angle < -135)))
		{
			this.isFollowing = true;
		}
	}

	if(this.isFollowing && dist < this.attackDistance)
	{
		this.hasPath = false;
		this.game.physics.arcade.moveToXY(this, this.state.monster.x, this.state.monster.y, LD33.MAN_RUN_SPEED);
	}
	else
	{
		if(this.isFollowing)
		{
			this.isFollowing = false;
			this.getNewPath();
		}
	}
	
	if(this.hasPath)
	{
		if(this.game.physics.arcade.distanceToXY(this, this.currentTarget.x, this.currentTarget.y) < 5)
		{
			this.pathIndex++;
			if(this.pathIndex < this.path.length)
			{
				this.currentTarget = this.setTarget(this.path[this.pathIndex]);
			}
			else
			{
				this.hasPath  = false;
				this.getNewPath();
			}
		}
		else
		{
			this.game.physics.arcade.moveToXY(this, this.currentTarget.x, this.currentTarget.y, this.currentSpeed);
		}
	}

	if(Math.abs(this.body.velocity.y) >= Math.abs(this.body.velocity.x))
	{
		if(this.body.velocity.y >= 0)
		{
			this.animations.play('down');
			this.facingDirection = 'down';
		}
		else
		{
			this.animations.play('up');
			this.facingDirection = 'up';
		}
	}
	else
	{
		if(this.body.velocity.x >= 0)
		{
			this.animations.play('right');
			this.facingDirection = 'right';
		}
		else
		{
			this.animations.play('left');
			this.facingDirection = 'left';
		}
	}

	if(this.collisionTimer < this.game.time.now)
	{
		this.hadCollision = false;
	}
};

LD33.Man.prototype.collision = function (sprite1, sprite2)
{
	if(this.hadCollision)
	{
		return;
	}

	this.hadCollision = true;
	this.collisionTimer = this.game.time.now + this.collisionTimeOut;

	this.hasPath = false;
	if(sprite1.body.touching.down)
	{
		this.getNewPath('down');
	}
	else if(sprite1.body.touching.up)
	{
		this.getNewPath('up');
	}
	else if(sprite1.body.touching.left)
	{
		this.getNewPath('left');
	}
	else if(sprite1.body.touching.right)
	{
		this.getNewPath('right');
	}
};

LD33.Man.prototype.getNewPath = function (side)
{
	this.path = [];
	var currentTile = this.state.map.getTile(Math.floor(this.x / LD33.TILESIZE), Math.floor(this.y / LD33.TILESIZE));

	var foundPos = false;
	var pos = new Phaser.Point(0, 0);

	var minX = 1;
	if(currentTile.x - this.maxPointRadius > minX)
	{
		minX = currentTile.x - this.maxPointRadius;
	}
	var maxX = this.state.createMap.mapWidth - 2;
	if(currentTile.x + this.maxPointRadius < maxX)
	{
		maxX = currentTile.x + this.maxPointRadius;
	}
	var minY = 1;
	if(currentTile.y - this.maxPointRadius > minY)
	{
		minY = currentTile.y - this.maxPointRadius;
	}
	var maxY = this.state.createMap.mapHeight - 2;
	if(currentTile.y + this.maxPointRadius < maxY)
	{
		maxY = currentTile.y + this.maxPointRadius;
	}

	if(side === 'down')
	{
		minY = currentTile.y;
	}
	else if(side === 'up')
	{
		maxY = currentTile.y;
	}
	else if(side === 'left')
	{
		minX = currentTile.x;
	}
	else if(side === 'right')
	{
		maxX = currentTile.x;
	}

	while(!foundPos)
	{
		var randomX = this.game.rnd.integerInRange(minX, maxX);
		var randomY = this.game.rnd.integerInRange(minY, maxY);

		if(this.state.createMap.mapArray[randomY][randomX] === 0)
		{
			pos.set(randomX, randomY);
			foundPos = true;
		}
	}

	this.currentSpeed = this.game.rnd.integerInRange(LD33.MAN_MIN_WALK_SPEED, LD33.MAN_MAX_WALK_SPEED);

	this.getPath(pos.x, pos.y);
};    

LD33.Man.prototype.getPath = function (targetX, targetY)
{
	var func = (function (path)
    {
    	if(path && path.length > 1)
    	{
    		this.path = path;
    		this.pathIndex = 1;
    		this.hasPath = true;
    		this.currentTarget = this.setTarget(this.path[this.pathIndex]);
    	}
    	else
    	{
    		console.log('no path possible or too short')
    		this.getNewPath();
    	}
    	
    }).bind(this);
    this.state.phaserStar.setCallbackFunction(func);

    var startTile = this.state.map.getTile(Math.floor(this.x / LD33.TILESIZE), Math.floor(this.y / LD33.TILESIZE));
    var targetTile = this.state.map.getTile(Math.floor(targetX), Math.floor(targetY));

    this.state.phaserStar.findPath(startTile.x, startTile.y, targetTile.x, targetTile.y);
    this.state.phaserStar.calculatePath(true);
};

LD33.Man.prototype.setTarget = function (pos)
{
	var position = new Phaser.Point(pos.x * LD33.TILESIZE + LD33.TILESIZE * 0.5, pos.y * LD33.TILESIZE + LD33.TILESIZE * 0.5);
	
	return position;
};