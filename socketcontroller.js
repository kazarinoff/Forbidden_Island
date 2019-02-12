var playernumber=0;
var chat=[]
const sendworld =function(message=''){
    io.emit('theworld',{world,thismessage:message})
    }

module.exports =

function(socket)
    {
    socket.on('here',function(data){
        socket.emit('startsocket',{world,player:playernumber,message: 'welcome to the Forbidden Island! You are player '+playernumber});
        playernumber++;
    })

    socket.on('startgame',function(){
        if (world.state=='none'){
            world= new World
            worldcontroller.startgame(world);
            sendworld();
        }
    })
    socket.on('chat',function(data){
        chat.push({comment:data.comment,user:data.user});
        console.log(chat);
        io.emit('chattext',{text:chat});
    })
    socket.on('endturn',function(){
        worldcontroller.endturn(world);
        sendworld();
    })
    socket.on('endgame',function(){
        worldcontroller.endcheck(world);
        if (world.state =='winnable'){
            worldcontroller.endgame(world);
            sendworld("You winn!");
        }
        else {socket.emit('gamended',{message:"You cant win yet!"})}
    })
    socket.on('moveplayer',function(data){
        worldcontroller.moveplayer(world,data.keynum);
        sendworld();
    })
    socket.on('shoreup',function(data){
        worldcontroller.shoreup(world,data.tileid);
        sendworld();
    })
    socket.on('sandbag',function(data){
        worldcontroller.sandbag(world,data.tileid);
        sendworld();
    })
    socket.on('helicopter',function(data){
        worldcontroller.helicopter(world,data.tileid);
        sendworld();
    })
    socket.on('prizefound',function(data){
        x=worldcontroller.claimprize(world,data.prize);
        sendworld("you found the "+x+" prize");
    })
}