const World =require('./islandmodel')
var tc=0,
    tl=1,
    tf=2,
    to=3,
    theli=4,
    tsb=5,
    twr=6;


module.exports={
    startgame: function (world){
        for (var i=0;i<6;i++){
                world.flooddeckdiscards.push(world.flooddeck[world.flooddeck.length-1]);
                world.flooddeckdiscards[world.flooddeckdiscards.length-1]['waterlevel']+=1;
                world.flooddeck.pop();
            }
        for (var j=0;j<world.players[0].length;j++){ 
            for (var i=0;i<2;i++){
                if (world.setuptreasurecards[world.setuptreasurecards.length-1]==tc){
                    world.player.cards.cup++;
                    world.setuptreasurecards.pop();
                }
                else if (world.setuptreasurecards[world.setuptreasurecards.length-1]==tl){
                    world.player.cards.lion++;
                    world.setuptreasurecards.pop();
                }
                else if (world.setuptreasurecards[world.setuptreasurecards.length-1]==tf){
                    world.player.cards.fire++;
                    world.setuptreasurecards.pop();
                }
                else if (world.setuptreasurecards[world.setuptreasurecards.length-1]==to){
                    world.player.cards.orb++;
                    world.setuptreasurecards.pop();
                }
                else if (world.setuptreasurecards[world.setuptreasurecards.length-1]==theli){
                    world.player.cards.heli++;
                    world.setuptreasurecards.pop();
                }
                else if (world.setuptreasurecards[world.setuptreasurecards.length-1]==tsb){
                    world.player.cards.sandbag++;
                    world.setuptreasurecards.pop();
                }
            }
            world.players[1]=(world.players[1]+1) % world.players[0].length;
            world.player=world.players[0][world.players[1]];
        }
        world.player.moves+=3;
        world.state='playing';
        world.narrative.push("The game is afoot!","It's now the Pilot's (blue) turn");
        
    },
    endturn: function(world){
        world.player.moves=0;
        world.treasuredeckdrawing();
        world.flooddeckdrawing();
        world.players[1]=(world.players[1]+1) % world.players[0].length;
        world.player=world.players[0][world.players[1]];
        world.player.moves+=3
        world.narrative.push("It's now the "+world.player.name+"'s ("+world.player.color+") turn");
    },
    endcheck: function(world){
        if ((world.tokens.fire) && (world.tokens.lion) && (world.tokens.cup) && (world.tokens.orb)){
            var helicards=0;
            for (var i=0; i<world.players[0].length;i++){
                if (world.players[0][i].x != world.tiles.a.x)
                    {return world}
                if (world.players[0][i].y != world.tiles.a.y)
                    {return world}
                helicards += world.players[0][i].cards.heli
                }
            if (helicards > 0) {world.state='winnable'};
        }
        return world;
    },
    endgame: function(world){
        if (world.state='winnable'){
            world.narrative.push('Fighting over swampyland and sea you have found all 4 treasures and made it back to your spaceship in one piece! Congratulations, you win!!!"');
            world.state='none'
        }
    },
    moveplayer: function(world,n){
        p=world.player
        if (p.moves>0){
            if (n==37 && world.island[p.y][p.x-1]['waterlevel'] <2 && world.island[p.y][p.x-1]!=0){
                p.x--;
                p.moves--;
                world.narrative.push("<p>The "+p['name']+" has moved to the "+world.island[p.y][p.x].name+".</p>")
                }
            else if (n==39 && world.island[p.y][p.x+1]['waterlevel'] <2 && world.island[p.y][p.x+1]!=0){
                p.x++;
                p.moves--;
                world.narrative.push("<p>The "+p['name']+" has moved to the "+world.island[p.y][p.x].name+".</p>")
                }
            else if (n==38 && world.island[p.y-1][p.x]['waterlevel'] <2 && world.island[p.y-1][p.x]!=0){
                p.y--;
                p.moves--;
                world.narrative.push("<p>The "+p['name']+" has moved to the "+world.island[p.y][p.x].name+".</p>")
                }
            else if (n==40 && world.island[p.y+1][p.x]['waterlevel'] <2 && world.island[p.y+1][p.x]!=0){
                p.y++;
                p.moves--;
                world.narrative.push("<p>The "+p['name']+" has moved to the "+world.island[p.y][p.x].name+".</p>")
                }
        };
        world.player=p;
    },
    shoreup: function(world,tileid){
        if (world.player.moves>=1){
            for (var i=0;i<world.alltiles.length;i++){
                if (tileid==world.alltiles[i].id){
                    world.alltiles[i].waterlevel=0;
                    world.player.moves--;
                    world.narrative.push("<p>The "+world.player['name']+" has shored up the "+world.alltiles[i].name+".</p>");
                }
            }
        }
    },
    sandbag: function(world,tid){
        world.player.cards.sandbag--;
        for (var i=0;i<world.alltiles.length;i++){
            if (tid==world.alltiles[i].id){
                world.alltiles[i].waterlevel=0;
                world.narrative.push("<p>You used a sandbag to shore up the "+world.alltiles[i].name+".</p>");
            }
        }
    },
    helicopter: function(world,tid){
        world.player.cards.heli--;
        for (var i=0;i<world.alltiles.length;i++){
            if (tid==world.alltiles[i].id){
                world.player.x=world.alltiles[i].x;
                world.player.y=world.alltiles[i].y;
                world.narrative.push("<p>A helicopter lift took you across the board to the "+world.alltiles[i].name+".</p>");
            }
        }
    },
    claimprize: function(world,prize){
        if (prize=='cup'){
            if ((world.player.cards.cup>=4) && (world.island[world.player.y][world.player.x].special=='cup'))
                {world.tokens.cup=true; world.player.cards.cup-=4; world.island[1][1]=0;
                world.narrative.push("<p>You've discovered the Ocean's Chalice!</p>")}
                return "cup"
            }
        if (prize=='lion'){
            if ((world.player.cards.lion>=4) && (world.island[world.player.y][world.player.x].special=='lion'))
                {world.tokens.lion=true; world.player.cards.lion-=4; world.island[6][1]=0;
                world.narrative.push("<p>You've discovered the Statue of the Wind</p>")}
                return "lion"
        }
        if (prize=='fire'){
            if ((world.player.cards.fire>=4) && (world.island[world.player.y][world.player.x].special=='fire'))
                {world.tokens.fire=true; world.player.cards.fire-=4; world.island[1][6]=0;
                world.narrative.push("<p>You've discovered the Crystal of Fire</p>")}
                return "fire"
            }
        if (prize=='orb'){
            if ((world.player.cards.orb>=4) && (world.island[world.player.y][world.player.x].special=='orb'))
                {world.tokens.orb=true; world.player.cards.orb-=4; world.island[6][6]=0;
                world.narrative.push("<p>You've discovered the Earthstone</p>")}
                return "orb"
        }
    },

}

