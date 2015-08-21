/*global LD33*/

var LD33 = {

};

LD33.Boot = function (game)
{
    
};

LD33.Boot.prototype = {
    
    preload: function ()
    {
        this.scale.pageAlignHorizontally = true;
    },
    
    create: function ()
    {
        this.state.start('preload');
    }
};