(function(){

   var digit=
    [
        [
            [0,0,1,1,1,0,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,0,1,1,0],
            [0,0,1,1,1,0,0]
        ],//0
        [
            [0,0,0,1,1,0,0],
            [0,1,1,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [1,1,1,1,1,1,1]
        ],//1
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,0,0,0,1,1],
            [1,1,1,1,1,1,1]
        ],//2
        [
            [1,1,1,1,1,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,0,0,1,1,0],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//3
        [
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,1,0],
            [0,0,1,1,1,1,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,1,1,0],
            [1,1,1,1,1,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,1,1]
        ],//4
        [
            [1,1,1,1,1,1,1],
            [1,1,0,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,1,1,1,1,0],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//5
        [
            [0,0,0,0,1,1,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,0,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//6
        [
            [1,1,1,1,1,1,1],
            [1,1,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0]
        ],//7
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//8
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,1,1,0,0,0,0]
        ],//9
        [
            [0,0,0,0,0,0,0],
            [0,0,1,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,1,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,0,0,0,0,0]
        ]//:
    ];

var canvas = document.getElementById('canvas');

if(canvas.getContext){
    var cxt = canvas.getContext('2d');
    //澹版槑canvas鐨勫楂�
    var H = 100,W = 700;
    canvas.height = H;
    canvas.width = W;
    cxt.fillStyle = '#f00';
    cxt.fillRect(10,10,50,50);

    //瀛樺偍鏃堕棿鏁版嵁
    var data = [];
    //瀛樺偍杩愬姩鐨勫皬鐞�
    var balls = [];
    //璁剧疆绮掑瓙鍗婂緞
    var R = canvas.height/20-1;
    (function(){
        var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        //瀛樺偍鏃堕棿鏁板瓧锛岀敱鍗佷綅灏忔椂銆佷釜浣嶅皬鏃躲€佸啋鍙枫€佸崄浣嶅垎閽熴€佷釜浣嶅垎閽熴€佸啋鍙枫€佸崄浣嶇閽熴€佷釜浣嶇閽熻繖7涓暟瀛楃粍鎴�
        data.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);
    })();

    /*鐢熸垚鐐归樀鏁板瓧*/
    function renderDigit(index,num){
        for(var i = 0; i < digit[num].length; i++){
            for(var j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] == 1){
                    cxt.beginPath();
                    cxt.arc(14*(R+2)*index + j*2*(R+1)+(R+1),i*2*(R+1)+(R+1),R,0,2*Math.PI);
                    cxt.closePath();
                    cxt.fill();
                }
            }
        }
    }

    /*鏇存柊鏃堕挓*/
    function updateDigitTime(){
        var changeNumArray = [];
        var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        var NewData = [];
        NewData.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);
        for(var i = data.length-1; i >=0 ; i--){
            //鏃堕棿鍙戠敓鍙樺寲
            if(NewData[i] !== data[i]){
                //灏嗗彉鍖栫殑鏁板瓧鍊煎拰鍦╠ata鏁扮粍涓殑绱㈠紩瀛樺偍鍦╟hangeNumArray鏁扮粍涓�
                changeNumArray.push(i+'_'+(Number(data[i])+1)%10);
            }
        }
        //澧炲姞灏忕悆
        for(var i = 0; i< changeNumArray.length; i++){
            addBalls.apply(this,changeNumArray[i].split('_'));
        }
        data = NewData.concat();
    }

    /*鏇存柊灏忕悆鐘舵€�*/
    function updateBalls(){
        for(var i = 0; i < balls.length; i++){
            balls[i].stepY += balls[i].disY;
            balls[i].x += balls[i].stepX;
            balls[i].y += balls[i].stepY;
            if(balls[i].x > W + R || balls[i].y > H + R){
                balls.splice(i,1);
                i--;
            }
        }
    }

    /*澧炲姞瑕佽繍鍔ㄧ殑灏忕悆*/
    function addBalls(index,num){
        var numArray = [1,2,3];
        var colorArray =  ["#3BE","#09C","#A6C","#93C","#9C0","#690","#FB3","#F80","#F44","#C00"];
        for(var i = 0; i < digit[num].length; i++){
            for(var j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] == 1){
                    var ball = {
                        x:14*(R+2)*index + j*2*(R+1)+(R+1),
                        y:i*2*(R+1)+(R+1),
                        stepX:Math.floor(Math.random() * 4 -2),
                        stepY:-2*numArray[Math.floor(Math.random()*numArray.length)],
                        color:colorArray[Math.floor(Math.random()*colorArray.length)],
                        disY:1
                    };
                    balls.push(ball);
                }
            }
        }
    }

    /*娓叉煋*/
    function render(){
        //閲嶇疆鐢诲竷瀹藉害锛岃揪鍒版竻绌虹敾甯冪殑鏁堟灉
        canvas.height = 100;
        //娓叉煋鏃堕挓
        for(var i = 0; i < data.length; i++){
            renderDigit(i,data[i]);
        }
        //娓叉煋灏忕悆
        for(var i = 0; i < balls.length; i++){
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,R,0,2*Math.PI);
            cxt.fillStyle = balls[i].color;
            cxt.closePath();
            cxt.fill();
        }
    }

    clearInterval(oTimer);
    var oTimer = setInterval(function(){
        //鏇存柊鏃堕挓
        updateDigitTime();
        //鏇存柊灏忕悆鐘舵€�
        updateBalls();
        //娓叉煋
        render();
    },50);
}

})();
