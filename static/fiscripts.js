var thesocketworld; //set socketworld
var playernumber;

//setting local variables for card values
var tc=0,
    tl=1,
    tf=2,
    to=3,
    theli=4,
    tsb=5,
    twr=6;

function displayIsland(world){
    var output = '';
    for (var i=0; i<world.island.length; i++){
        output += "<div class='row'>";
            for(j=0;j<world.island[i].length;j++){
            if(world.island[i][j]==0){output += "<div class='tile wall'><p></p></div>";}
            else if (world.island[i][j]==1){output += "<div class='tile cup prize'></div>";}
            else if (world.island[i][j]==2){output += "<div class='tile fire prize'></div>";}
            else if (world.island[i][j]==3){output += "<div class='tile lion prize'></div>";}
            else if (world.island[i][j]==4){output += "<div class='tile orb prize'></div>";}
            else if ((world.island[i][j]['waterlevel']==1) && (((i==world.player.y) && (j==world.player.x))|| ((i==world.player.y+1) && (j==world.player.x))||((i==world.player.y-1) && (j==world.player.x))|| ((i==world.player.y) && (j==world.player.x-1))|| ((i==world.player.y) && (j==world.player.x+1)) ))
                {output+="<div id='"+world.island[i][j]['id']+"' class='tile sinking shoreable "+world.island[i][j]['special']+"'><p>"+world.island[i][j]['name']+"</p></div>"}
            else if (world.island[i][j]['waterlevel']==1)
                {output+="<div id='"+world.island[i][j]['id']+"' class='tile sinking "+world.island[i][j]['special']+"'><p>"+world.island[i][j]['name']+"</p></div>"}
            else if (world.island[i][j]['waterlevel']==2)
                {output+="<div id='"+world.island[i][j]['id']+"' class='tile sunk "+world.island[i][j]['special']+"'><p>"+world.island[i][j]['name']+"</p></div>"}
            else 
                {output+="<div id='"+world.island[i][j]['id']+"' class='tile "+world.island[i][j]['special']+"'><p>"+world.island[i][j]['name']+"</p></div>"}
        }
        output+="</div>";
    }
    document.getElementById('island').innerHTML = output; 
}

function displayPlayers(world){ 
    document.getElementById('player1').style.left =world.player1.x*98+20 +'px';
    document.getElementById('player1').style.top =world.player1.y*98+20+'px';
    document.getElementById('player2').style.left =world.player2.x*98+20 +'px';
    document.getElementById('player2').style.top =world.player2.y*98+60 +'px';
    document.getElementById('player3').style.left =world.player3.x*98+60 +'px';
    document.getElementById('player3').style.top =world.player3.y*98+20 +'px';
    document.getElementById('player4').style.left =world.player4.x*98+60 +'px';
    document.getElementById('player4').style.top =world.player4.y*98+60 +'px';

};

function displayPlayer1Hand(world){
    output="<h5>Pilot</h5>";
    output+="<div class='card cup'></div>".repeat(world.player1.cards.cup);
    output+="<div class='card fire'></div>".repeat(world.player1.cards.fire);
    output+="<div class='card lion'></div>".repeat(world.player1.cards.lion);
    output+="<div class='card orb'></div>".repeat(world.player1.cards.orb);
    output+="<div class='card heli'></div>".repeat(world.player1.cards.heli);
    output+="<div class='card sandbag'></div>".repeat(world.player1.cards.sandbag);
    document.getElementById('player1hand').innerHTML = output;
};
function displayPlayer2Hand(world){
    output="<h5>Engineer</h5>";
    output+="<div class='card cup'></div>".repeat(world.player2.cards.cup);
    output+="<div class='card fire'></div>".repeat(world.player2.cards.fire);
    output+="<div class='card lion'></div>".repeat(world.player2.cards.lion);
    output+="<div class='card orb'></div>".repeat(world.player2.cards.orb);
    output+="<div class='card heli'></div>".repeat(world.player2.cards.heli);
    output+="<div class='card sandbag'></div>".repeat(world.player2.cards.sandbag);
    document.getElementById('player2hand').innerHTML = output;
};
function displayPlayer3Hand(world){
    output="<h5>Explorer</h5>"
    output+="<div class='card cup'></div>".repeat(world.player3.cards.cup);
    output+="<div class='card fire'></div>".repeat(world.player3.cards.fire);
    output+="<div class='card lion'></div>".repeat(world.player3.cards.lion);
    output+="<div class='card orb'></div>".repeat(world.player3.cards.orb);
    output+="<div class='card heli'></div>".repeat(world.player3.cards.heli);
    output+="<div class='card sandbag'></div>".repeat(world.player3.cards.sandbag);
    document.getElementById('player3hand').innerHTML = output;
};
function displayPlayer4Hand(world){
    output="<h5>Navigator</h5>"
    output+="<div class='card cup'></div>".repeat(world.player4.cards.cup);
    output+="<div class='card fire'></div>".repeat(world.player4.cards.fire);
    output+="<div class='card lion'></div>".repeat(world.player4.cards.lion);
    output+="<div class='card orb'></div>".repeat(world.player4.cards.orb);
    output+="<div class='card heli'></div>".repeat(world.player4.cards.heli);
    output+="<div class='card sandbag'></div>".repeat(world.player4.cards.sandbag);
    document.getElementById('player4hand').innerHTML = output;
};
function displayHands(world){
    displayPlayer1Hand(world);
    displayPlayer2Hand(world);
    displayPlayer3Hand(world);
    displayPlayer4Hand(world);
}
function displayEverthing(world){
    displayIsland(world);
    displayHands(world);
    displayPlayers(world);
    output=''
    for (var i=world.narrative.length-1;i>=(world.narrative.length-6);i--){
        if (world.narrative[i]) {output += "<p>"+world.narrative[i]+"<p>"}
        }
    document.getElementById('narration').innerHTML = output; 
    document.getElementById('movesleft').innerHTML = world.player.moves;
    }
$('#prizes .tile').hide();
var socket = io();
socket.emit('here',{});
socket.on('startsocket', function(data){
    thesocketworld=data.world;
    playernumber=data.player;
    alert(data.message);
    $(document).on()
    displayEverthing(thesocketworld);
});
$('#commentform').submit(function(event){
    console.log(this.chattext.value)
    socket.emit('chat',{comment:this.chattext.value,user:playernumber})
    event.preventDefault();
})
socket.on('chattext',function(data){
    $('#chats').append("<p>Player "+data.text[data.text.length-1].user+": "+data.text[data.text.length-1].comment+"</p>")
})
startbutton.onclick= function () {
        if (thesocketworld.state =='none'){
        socket.emit('startgame',{});
        }
}
socket.on('theworld',function(data){
    thesocketworld=data.world;
    if (data.thismessage){alert(data.thismessage)};
    displayEverthing(thesocketworld)
})



$('#endturnbutton').click (function (){
    socket.emit('endturn',{});
    });
$('#endgamebutton').click(function(){
    socket.emit('endgame',{})
});

$('#stopgamebutton').click (function (){
    socket.emit('stopgame',{})
});
document.onkeydown= function(e){
    // if (thesocketworld.player.order==playernumber){
        if (thesocketworld.player.moves>=1){
            socket.emit('moveplayer',{keynum: e.keyCode})
        }
    // }
}
$('#island').on('click','.shoreable', function(){
    if (thesocketworld.player.moves>=1){
        h=$(this).attr('id');
        socket.emit('shoreup',{tileid:h})
    }
});

$('#handbar').on('click','.sandbag', function(){
    alert("Click on the tile that you'd like to shore up.")
    $('#island').on('click','.sinking',function(){
        h=$(this).attr('id');
        socket.emit('sandbag',{tileid:h})
    });
});

$('#handbar').on('click','.heli', function(){
    alert("Click on the tile that you'd like to move "+thesocketworld.player.name+" to.")
    $('#island').on('click','.tile',function(){
        h=$(this).attr('id');
        socket.emit('helicopter',{tileid:h})
        $('#island').off('click','.tile')
    })
});

$('#island').on('click','.prize.cup', function(){ 
    if ((thesocketworld.player.cards.cup>=4) && (thesocketworld.island[thesocketworld.player.y][thesocketworld.player.x].special=='cup')){
            socket.emit('prizefound',{prize:'cup'})
            $('#prizes .cup').fadeIn(1000);
        }
});

$('#island').on('click','.prize.lion', function(){ 
    if ((thesocketworld.player.cards.lion>=4) && (thesocketworld.island[thesocketworld.player.y][thesocketworld.player.x].special=='lion')){
            socket.emit('prizefound',{prize:'lion'})
            $('#prizes .lion').fadeIn(1000);
        }
});
$('#island').on('click','.prize.fire', function(){ 
    if ((thesocketworld.player.cards.fire>=4) && (thesocketworld.island[thesocketworld.player.y][thesocketworld.player.x].special=='fire')){
            socket.emit('prizefound',{prize:'fire'})
            $('#prizes .fire').fadeIn(1000);
        }
});
$('#island').on('click','.prize.orb', function(){ 
    if ((thesocketworld.player.cards.orb>=4) && (thesocketworld.island[thesocketworld.player.y][thesocketworld.player.x].special=='orb')){
            socket.emit('prizefound',{prize:'orb'})
            $('#prizes .orb').fadeIn(1000);
        }
});


$(document).on()

// alert("Welcome to the Forbidden Island! In this game you play four intrepid adventurers who have landed on a mysterious island in hopes of discovering powerful treasures, but you quickly discover that the island doesn't take kindly to visitors and is slowly sinking into the sea. Your goal is to collect all four treasure tokens and escape in your spaceship from the Landing Pad before you drown!");
// alert("This is webbased version of the popular boardgame designed by Matt Leacock and Gamewright Games. In this version you will play all four players. Click on the 'START GAME' button to read a brief (well kinda brief anyway) summary of the rules and begin.");

// alert ("Some of the island has started to sink, but luckily you start out with some treasure cards too. Good luck!");
// alert("During each turn you have 3 actions to use. You can move your token with the arrow keys, using one action per move. You can also click on any submerged tiles that you are on or adjacent to, 'to shore them up'.")
// alert("Click on the 'END TURN' button to advance to the next player's turn. You will recieve two treasure more cards (displayed on the right), and a few more tiles will begin to sink (remember you want to use actions to shore them up!)")
// alert("You can  move across submerged tiles, but you will want to try to 'shore them up' with your actions before they SINK completely. You cannot move over sunk tiles, and they cannot be saved")
// alert("Sometimes the 'WATERS WILL RISE'. This is BAD- when it happens, the flood cards already drawn are shuffled and put on the top of the deck so they will come up again and will quickly lead to submerged tiles becoming sunk")
// alert("When a player has 4 of the same treasure card they can discover that treasure by moving to one of the squares with a title colored like the treasure. Then click on the treasure to claim it.")
// alert("The game is won when you discover all 4 treasures, move all players back on the landing pad, and fly away using a 'HELICOPTER LIFT' card")
// alert("GOT IT? Let's hope so. You start playing as the "+player['name']+" ("+player['color']+").")
// $("#narrativebox h3 ").after ("<p>It's now the "+player['name']+"'s ("+player['color']+") turn.</p>");
// };
