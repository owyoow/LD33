LD33.Man = function (game, x, y, state)
{
	Phaser.Sprite.call(this, game, x, y, 'sheet', 'manDown.png');
};

LD33.Man.prototype = Object.create(Phaser.Sprite.prototype);
LD33.Man.prototype.constructor = LD33.Man;