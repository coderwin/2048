window.onload=function(){
	var game2048=document.getElementById('game2048');
	var start=document.getElementById('start');
	start.onclick=function(){
		this.style.display='none';
		for(var i=0;i<16;i++){
			var tile=document.createElement('div');
			tile.className='tile tile';
			tile.setAttribute('index',i);
			tile.setAttribute('val',0);
			tile.innerHTML='';
			game2048.appendChild(tile);
		}
		randomTile();
		randomTile();
	}
	function randomTile(){
		var randomNumber=Math.floor(Math.random()*16);
		var _randomTile=game2048.getElementsByTagName('div')[randomNumber];
		if(_randomTile.innerHTML==''){
			_randomTile.innerHTML=Math.random() < 0.8 ? 2 : 4;	//出现2的概率为80%
			_randomTile.className='tile tile'+_randomTile.innerHTML;
			_randomTile.setAttribute('val',_randomTile.innerHTML);
		}else{
			randomTile();
		}
	}
	window.onkeydown=function(e){
		var arrVal=[];
		for(var i=0;i<16;i++){
			arrVal.push(game2048.getElementsByTagName('div')[i].getAttribute('val'));
		}
		var tiles=document.getElementsByClassName('tile');
		var keynum, keychar;
		if(window.event){
			keynum=event.keyCode;
		}else if(e.which){
			keynum=e.which;
		}
		keychar=String.fromCharCode(keynum);
		if(['W','S','A','D'].indexOf(keychar)>-1){
			var j;
			switch(keychar){
				case 'W':
				for(var i=4;i<16;i++){
					j=i;
					while(j>=4){
						merge(tiles[j-4], tiles[j]);
						j-=4;
					}
				}
				break;
				case 'S':
				for(var i=11;i>=0;i--){
					j=i;
					while(j<=11){
						merge(tiles[j+4], tiles[j]);
						j+=4;
					}
				}
				break;
				case 'A':
				for(var i=1;i<16;i++){
					j=i;
					while(j%4!=0){
						merge(tiles[j-1], tiles[j]);
						j-=1;
					}
				}
				break;
				case 'D':
				for(var i=14;i>=0;i--){
					j=i;
					while(j%4!=3){
						merge(tiles[j+1], tiles[j]);
						j+=1;
					}
				}
				break;
			}
			//判断滑动是否引起了游戏数组的变化，没有变化的话就不去产生随机数组
			var newArrVal=[];
			for(var i=0;i<16;i++){
				newArrVal.push(game2048.getElementsByTagName('div')[i].getAttribute('val'));
			}
			if(newArrVal.join('')!=arrVal.join('')){
				randomTile();
			}
		}else if([37,38,39,40].indexOf(keynum)>-1){
			var j;
			switch(keynum){
				//up
				case 38:
				for(var i=4;i<16;i++){
					j=i;
					while(j>=4){
						merge(tiles[j-4], tiles[j]);
						j-=4;
					}
				}
				break;
				//down
				case 40:
				for(var i=11;i>=0;i--){
					j=i;
					while(j<=11){
						merge(tiles[j+4], tiles[j]);
						j+=4;
					}
				}
				break;
				//left
				case 37:
				for(var i=1;i<16;i++){
					j = i;
					while(j%4!=0){
						merge(tiles[j - 1], tiles[j]);
						j -=1;
					}
				}
				break;
				//right
				case 39:
				for(var i=14;i>=0;i--){
					j=i;
					while(j%4!=3){
						merge(tiles[j+1], tiles[j]);
						j+=1;
					}
				}
				break;
			}
			var newArrVal=[];
			for(var i=0;i<16;i++){
				newArrVal.push(game2048.getElementsByTagName('div')[i].getAttribute('val'));
			}
			if(newArrVal.join('')!=arrVal.join('')){
				randomTile();
			}
		}
		function merge(prevTile, currTile){
			var prevVal=prevTile.getAttribute('val');
			var currVal=currTile.getAttribute('val');
			if(currVal!=0){
				if(prevVal==0){
					setTileVal(prevTile, currVal);
					setTileVal(currTile, 0);
				}
				else if(prevVal==currVal){
					setTileVal(prevTile, prevVal * 2);
					setTileVal(currTile, 0);
				}
			}
		}
		function setTileVal(tile, val){
			tile.className='tile tile'+val;
			tile.setAttribute('val',val);
			tile.innerHTML=val>0?val:'';
		}
		//游戏结束的判断--判断相邻的数是否有相等的
		function gameOver(){
			for(var i=0;i<16;i++){
				if(tiles[i].getAttribute('val')==0){
					return false;
				}
				if(i%4!=3){
					if(tiles[i].getAttribute('val')==tiles[i+1].getAttribute('val')){
						return false;
					}
				}
				if(i<12){
					if(tiles[i].getAttribute('val')==tiles[i+4].getAttribute('val')){
						return false;
					}
				}
			}
			return true;
		}
		if(gameOver()){
			alert('GAME OVER!ARE YOU REPLAY?');
			start.innerHTML="GAME OVER!ARE YOU REPLAY?"
			start.style.display='block';	
			//tips
			for(var i=0;i<16;i++){
				var removeTiles=game2048.getElementsByTagName('div');
				game2048.removeChild(removeTiles[0]);
			}
		}		
	}
	game2048.onmousedown=function(ev){
		var _this=this;
		var e=ev||event;
		var posX=e.clientX-_this.offsetLeft;
		var posY=e.clientY-_this.offsetTop;
		document.onmousemove=function(ev){
			var e=ev||event;
			var left=e.clientX-posX;
			var top=e.clientY-posY;
			//限制拖拽
			if(left<0){
		        left=0;
		    }else if(left>document.documentElement.clientWidth-_this.offsetWidth){
		        left=document.documentElement.clientWidth-_this.offsetWidth;
		    }
		    if(top<0){
		        top=0;
		    }else if(top>document.documentElement.clientHeight-_this.offsetHeight){
		        top=document.documentElement.clientHeight-_this.offsetHeight;
		    }
			_this.style.left=left+"px";
			_this.style.top=top+"px";
		}
		document.onmouseup=function(){
			document.onmouseup=null;
			document.onmousemove=null;
		}
		return false;
	};
};