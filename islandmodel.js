var tc=0,
    tl=1,
    tf=2,
    to=3,
    theli=4,
    tsb=5,
    twr=6;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

function alltilepositions(x){
    for (var i=0;i<x.length;i++){
        for (var j=0; j<x[i].length;j++){
            x[i][j]['x']=j;
            x[i][j]['y']=i;
        };
    };
};

module.exports= 
    class World {
    constructor(){
        this.state='none'
        this.difficultylevel=2;
        this.tiles= {a:{id:1,name:"Fool's Landing",special:'foolslanding',x:0,y:0,waterlevel:0},
            b:{id:2,name:"Tidal Palace",special:'cup',x:0,y:0,waterlevel:0},
            c:{id:3,name:"Coral Palace",special:'cup',x:0,y:0,waterlevel:0},
            d:{id:4,name:"Cave of Shadows",special:'fire',x:0,y:0,waterlevel:0},
            e:{id:5,name:"Cave of Embers",special:'fire',x:0,y:0,waterlevel:0},
            f:{id:6,name:"Whispering Garden",special:'lion',x:0,y:0,waterlevel:0},
            g:{id:7,name:"Howling Garden",special:'lion',x:0,y:0,waterlevel:0},
            h:{id:8,name:"Temple of the Moon",special:'orb',x:0,y:0,waterlevel:0},
            i:{id:9,name:"Temple of the Sun",special:'orb',x:0,y:0,waterlevel:0},
            j:{id:10,name:"Breakers Bridge",special:'',x:0,y:0,waterlevel:0},
            k:{id:11,name:"Phantom Rock",special:'',x:0,y:0,waterlevel:0},
            l:{id:12,name:"Silver Gate",special:'',x:0,y:0,waterlevel:0},
            m:{id:13,name:"Watchtower",special:'',x:0,y:0,waterlevel:0},
            n:{id:14,name:"Copper Gate",special:'',x:0,y:0,waterlevel:0},
            o:{id:15,name:"Cliffs of Abandon",special:'',x:0,y:0,waterlevel:0},
            p:{id:16,name:"Twilight Hollow",special:'',x:0,y:0,waterlevel:0},
            q:{id:17,name:"Lost Lagoon",special:'',x:0,y:0,waterlevel:0},
            r:{id:18,name:"Crimson Forest",special:'',x:0,y:0,waterlevel:0},
            s:{id:19,name:"Gold Gate",special:'',x:0,y:0,waterlevel:0},
            t:{id:20,name:"Iron Gate",special:'',x:0,y:0,waterlevel:0},
            u:{id:21,name:"Dunes of Deception",special:'',x:0,y:0,waterlevel:0},
            v:{id:22,name:"Bronze Gate",special:'',x:0,y:0,waterlevel:0},
            w:{id:23,name:"Misty Marsh",special:'',x:0,y:0,waterlevel:0},
            x:{id:24,name:"Observatory",special:'',x:0,y:0,waterlevel:0}
        };
        this.alltiles =[this.tiles.a,this.tiles.b,this.tiles.c,this.tiles.d,this.tiles.e,this.tiles.f,this.tiles.g,this.tiles.h,this.tiles.i,this.tiles.j,this.tiles.k,this.tiles.l,this.tiles.m,this.tiles.n,this.tiles.o,this.tiles.p,this.tiles.q,this.tiles.r,this.tiles.s,this.tiles.t,this.tiles.u,this.tiles.v,this.tiles.w,this.tiles.x];
        this.alltiles2 =[this.tiles.a,this.tiles.b,this.tiles.c,this.tiles.d,this.tiles.e,this.tiles.f,this.tiles.g,this.tiles.h,this.tiles.i,this.tiles.j,this.tiles.k,this.tiles.l,this.tiles.m,this.tiles.n,this.tiles.o,this.tiles.p,this.tiles.q,this.tiles.r,this.tiles.s,this.tiles.t,this.tiles.u,this.tiles.v,this.tiles.w,this.tiles.x];
        this.alltreasures =[tc,tc,tc,tc,tc,tl,tl,tl,tl,tl,tf,tf,tf,tf,tf,to,to,to,to,to,theli,theli,theli,tsb,tsb,twr,twr,twr];
        this.treasuresnowr =[tc,tc,tc,tc,tc,tl,tl,tl,tl,tl,tf,tf,tf,tf,tf,to,to,to,to,to,theli,theli,theli,tsb,tsb];
        
        this.setuptreasurecards = shuffleArray(this.treasuresnowr);
        this.treasuredeck= shuffleArray(this.alltreasures);
        this.treasuredeckdiscards=[];

        this.initialorder = shuffleArray(this.alltiles);
        this.flooddeck = shuffleArray(this.alltiles2);
        this.flooddeckdiscards=[];
        this.island =[
            [0,0,0,0,0,0,0,0],
            [0,1,0,this.initialorder[0],this.initialorder[1],0,2,0],
            [0,0,this.initialorder[2],this.initialorder[3],this.initialorder[4],this.initialorder[5],0,0],
            [0,this.initialorder[6],this.initialorder[7],this.initialorder[8],this.initialorder[9],this.initialorder[10],this.initialorder[11],0],
            [0,this.initialorder[12],this.initialorder[13],this.initialorder[14],this.initialorder[15],this.initialorder[16],this.initialorder[17],0],
            [0,0,this.initialorder[18],this.initialorder[19],this.initialorder[20],this.initialorder[21],0,0],
            [0,3,0,this.initialorder[22],this.initialorder[23],0,4,0],
            [0,0,0,0,0,0,0,0]
            ];
        
        alltilepositions(this.island);

        this.player1 = {name: "Pilot", x: this.tiles.a['x'], y: this.tiles.a['y'], alive: true, moves:0,
            cards:{cup:4, lion:0, fire:0, orb:0, heli:1, sandbag:0, order:0},
            color:'blue'};
        this.player2 = {name: "Engineer", x: this.tiles.v['x'], y: this.tiles.v['y'], alive: true,moves:0,
            cards:{cup:0, lion:4, fire:0, orb:0, heli:0, sandbag:0, order:1},
            color:'red'};
        this.player3={ name: "Explorer",x: this.tiles.n['x'],y: this.tiles.n['y'],alive: true,moves:0,
            cards:{cup:0,lion:0,fire:4,orb:0,heli:0,sandbag:0, order:0},
            color:'green'};
        this.player4={name: "Navigator",x: this.tiles.s['x'],y: this.tiles.s['y'],alive: true,moves:0,
            cards:{cup:0,lion:0,fire:0,orb:4,heli:0,sandbag:0, order:1},
            color:'yellow'};

        this.players=[[this.player1,this.player2,this.player3,this.player4],0];
        this.player=this.players[0][1];
        this.tokens={ fire:false, lion:false, orb:false, cup:false};
        this.moves=3;
        this.narrative=[];
    }
    flooddeckdrawing(){
        for (var i=0;i<this.difficultylevel;i++){
            this.flooddeckdiscards.push(this.flooddeck[this.flooddeck.length-1]);
            this.flooddeckdiscards[this.flooddeckdiscards.length-1]['waterlevel']+=1;
            if (this.flooddeckdiscards[this.flooddeckdiscards.length-1]['waterlevel']==1){
                this.narrative.push("The "+this.flooddeckdiscards[this.flooddeckdiscards.length-1]['name']+" is flooding")};
            this.flooddeck.pop();
            if (this.flooddeckdiscards[this.flooddeckdiscards.length-1]['waterlevel']==2){
                this.narrative.push("The "+this.flooddeckdiscards[this.flooddeckdiscards.length-1]['name']+" has SUNK into the sea!");
                this.flooddeckdiscards.pop();
                }
            if (this.flooddeck.length==0){
                this.flooddeck=shuffleArray(this.flooddeckdiscards)
                }
        };
        return this;
    };
    waterrisecard(){
        this.difficultylevel+=.5;
        this.narrative.push("The water is rising! The water level is now set to HIGHERDIFFICULTY");
        this.putbackdeck=shuffleArray(this.flooddeckdiscards);
        for (var i=0;i<this.putbackdeck.length;i++){
            this.flooddeck.push(this.putbackdeck[i]);
        };
        this.flooddeckdiscards=[];
        return this;
    };

    treasuredeckdrawing(){
        if (this.treasuredeck.length==0){
            this.treasuredeck=shuffleArray(this.treasuredeckdiscards);
            this.treasuredeckdiscards=[];
        }
        if (this.treasuredeck[this.treasuredeck.length-1]==twr){
            this.treasuredeckdiscards.push(twr);
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==tc){
            this.player.cards.cup++;
            this.narrative.push("You drew a cup treasure card");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==tl){
            this.player.cards.lion++;
            this.narrative.push("You drew a lion treasure card");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==tf){
            this.player.cards.fire++;
            this.narrative.push("You drew a fire treasure card");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==to){
            this.player.cards.orb++;
            this.narrative.push("You drew an orb treasure card");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==theli){
            this.player.cards.heli++;
            this.narrative.push("You drew a helicopter lift card. Click on this card to move the current player to any unsunk tile on the board.");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==tsb){
            this.player.cards.sandbag++;
            this.narrative.push("You drew a sandbags card. Click on this card to shore up any tile.");
            this.treasuredeck.pop();
        }
        if (this.treasuredeck.length==0){
            this.treasuredeck=shuffleArray(this.treasuredeckdiscards);
            this.treasuredeckdiscards=[];
        }
        if (this.treasuredeck[this.treasuredeck.length-1]==twr){
            this.treasuredeckdiscards.push(twr);
            this.treasuredeck.pop();
            this.waterrisecard();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==tc){
            this.player.cards.cup++;
            this.narrative.push("You drew an cup treasure card");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==tl){
            this.player.cards.lion++;
            this.narrative.push("You drew an lion treasure card");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==tf){
            this.player.cards.fire++;
            this.narrative.push("You drew an fire treasure card");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==to){
            this.player.cards.orb++;
            this.narrative.push("You drew an orb treasure card");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==theli){
            this.player.cards.heli++;
            this.narrative.push("You drew a helicopter lift card. Click on this card to move the current player to any unsunk tile on the board.");
            this.treasuredeck.pop();
        }
        else if (this.treasuredeck[this.treasuredeck.length-1]==tsb){
            this.player.cards.sandbag++;
            this.narrative.push("You drew a sandbags card. Click on this card to shore up any tile.");
            this.treasuredeck.pop();
        }
    return this;
    };
}
