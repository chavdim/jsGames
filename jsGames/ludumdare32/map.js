
function Map () {
	this.reset=function  () {
		this.data= {
			0:{
				terrain:[new TerrainRect(0,400,500,150,0),new TerrainRect(300,200,100,50,0)],
				entities:[new Badguy(200,320,50,"right")],
				
			},
			1:{
				terrain:[new TerrainRect(80,100,120,50,0),new TerrainRect(0,140,560,50,0),
				new TerrainRect(380,100,200,50,0),new TerrainRect(460,320,240,50,0),
				new TerrainRect(100,360,640,50,0),new TerrainRect(60,320,180,50,0),
				new TerrainRect(0,470,80,180,0),new TerrainRect(60,510,180,110,0),
				new TerrainRect(160,555,250,50,0),new TerrainRect(310,510,360,110,0),
				new TerrainRect(0,120,80,50,0)],
				entities:[new Badguy(200,60,150,"right"),new Badguy(240,280,180,"right")
				,new Badguy(420,280,180,"left"),new Badguy(310,410,80,"left")],

				transitions:[new TransitionRect(660,420,10,150,6,0,0),
				new TransitionRect(-20,20,10,150,101,0,600)]
			},
			2:{
				terrain:[new TerrainRect(0,555,200,50,0),new TerrainRect(200,510,560,120,0),
				new TerrainRect(580,450,160,120,0),new TerrainRect(620,410,560,120,0),
				new TerrainRect(200,340,340,50,0),new TerrainRect(200,290,240,50,0),
				new TerrainRect(200,240,160,50,0),new TerrainRect(460,180,260,30,0),
				new TerrainRect(0,0,260,340,0),new TerrainRect(0,510,60,60,0)],
				entities:[new Badguy2(210,480,280,"right"),new Badguy2(490,480,280,"left"),
				new Badguy(500,260,60,"left"),new Badguy(410,210,50,"left")],

				transitions:[new TransitionRect(660,20,10,150,3,0,0),
				new TransitionRect(-20,420,10,150,6,0,600)]
			},
			3:{
				terrain:[new TerrainRect(0,180,80,50,0),new TerrainRect(200,510,260,120,0),
				new TerrainRect(570,540,160,80,0),new TerrainRect(0,230,100,50,0)
				,new TerrainRect(0,280,120,50,0),new TerrainRect(0,330,140,50,0)
				,new TerrainRect(0,380,160,50,0),new TerrainRect(0,430,180,50,0)
				,new TerrainRect(0,480,200,330,0)],
				entities:[new Badguy2(190,480,180,"right"),new Badguy2(380,480,180,"left")
				],

				transitions:[new TransitionRect(660,420,10,150,4,0,0),
				new TransitionRect(-20,20,10,150,2,0,600)]
			},
			4:{
				terrain:[new TerrainRect(0,540,550,110,0),
				new TerrainRect(520,230,200,50,0)
				,new TerrainRect(490,280,220,50,0),new TerrainRect(460,330,240,50,0)
				,new TerrainRect(430,380,260,50,0),new TerrainRect(400,430,280,50,0)
				,new TerrainRect(370,480,400,330,0)],
				entities:[new Badguy3(360,440,180,"left")],

				transitions:[new TransitionRect(-20,420,10,150,3,0,600),
				new TransitionRect(660,80,10,150,5,0,0)]
			},
			5:{
				terrain:[new TerrainRect(0,230,100,50,0)
				,new TerrainRect(0,280,120,50,0),new TerrainRect(0,330,140,50,0)
				,new TerrainRect(0,380,160,50,0),new TerrainRect(0,430,180,50,0)
				,new TerrainRect(0,480,200,330,0),new TerrainRect(560,230,200,50,0)
				,new TerrainRect(490,280,220,50,0),new TerrainRect(460,330,240,50,0)
				,new TerrainRect(430,380,260,50,0),new TerrainRect(400,430,280,50,0)
				,new TerrainRect(370,480,400,20,0),new TerrainRect(200,580,460,20,0)
				,new TerrainRect(0,530,220,110,0)],
				entities:[new Badguy3(360,440,180,"left"),new Badguy3(420,340,180,"left"),
				new Badguy3(520,240,180,"left")],

				transitions:[new TransitionRect(-20,80,10,150,4,0,600),
				new TransitionRect(660,420,10,150,7,0,00)]
			},
			6:{
				terrain:[new TerrainRect(0,580,660,20,0),new TerrainRect(0,510,80,120,0)
				,new TerrainRect(570,510,80,120,0)],
				entities:[],

				transitions:[new TransitionRect(-20,420,10,150,1,0,600),
				new TransitionRect(660,420,10,150,2,0,00)]
			},
			7:{
				terrain:[new TerrainRect(0,580,660,20,0),
				new TerrainRect(220,520,660,60,0),
				new TerrainRect(260,460,660,60,0),
				new TerrainRect(400,400,660,60,0),
				//new TerrainRect(480,340,660,60,0),
				//new TerrainRect(560,280,660,60,0),
				new TerrainRect(0,140,60,60,0),
				new TerrainRect(230,340,120,20,0),
				new TerrainRect(80,280,120,20,0),
				new TerrainRect(250,220,120,20,0),
				new TerrainRect(450,160,120,20,0),

				new TerrainRect(550,140,120,40,0)
				],

				entities:[new Badguy3(220,480,180,"left"),
				new Badguy3(560,360,60,"left"),

				new Badguy(330,260,100,"left"),
				new Badguy(80,200,100,"right"),
				new Badguy(350,140,100,"left")],

				transitions:[new TransitionRect(-20,420,10,150,5,0,600),
				new TransitionRect(660,0,10,150,8,0,0)]
			},
			8:{
				terrain:[

				new TerrainRect(0,140,80,40,0),
				new TerrainRect(0,180,320,40,0),

				new TerrainRect(270,450,120,20,0),
				new TerrainRect(80,400,120,20,0),
				new TerrainRect(300,340,420,40,0),
				new TerrainRect(420,280,60,20,0),
				new TerrainRect(0,220,360,20,0),
				new TerrainRect(0,220,100,200,0),

				new TerrainRect(160,0,520,112,0),

				new TerrainRect(0,520,660,200,0)
				],

				entities:[new Badguy3(580,480,180,"left"),
				new Badguy3(560,300,180,"left"),
				new Badguy2(300,310,180,"right"),
				//new Badguy(180,320,80,"left"),
				new Badguy2(480,380,180,"left")],

				transitions:[new TransitionRect(-20,20,10,150,7,0,600),
				new TransitionRect(-20,420,10,150,9,0,600)]
			},
			9:{
				terrain:[
				new TerrainRect(0,520,660,200,0),
				new TerrainRect(500,460,60,60,0),
				new TerrainRect(0,460,60,60,0),
				new TerrainRect(130,400,300,20,0),
				new TerrainRect(190,280,230,20,0),
				new TerrainRect(190,280,60,180,0),
				new TerrainRect(520,340,120,20,0),
				new TerrainRect(0,0,160,300,0),
				new TerrainRect(130,370,20,40,0),
				new TerrainRect(0,400,40,80,0)
				],

				entities:[new Badguy3(150,360,180,"left"),
				new Badguy3(580,300,60,"left")],

				transitions:[new TransitionRect(660,420,10,150,8,0,20),
				new TransitionRect(-20,300,10,150,10,0,600)]
			},
			10:{
				terrain:[
				new TerrainRect(0,120,20,600,0),

				new TerrainRect(270,450,120,20,0),
				new TerrainRect(80,390,120,20,0),
				new TerrainRect(270,320,120,20,0),
				new TerrainRect(80,260,120,20,0),
				new TerrainRect(270,190,120,20,0),
				new TerrainRect(0,120,200,20,0),
				new TerrainRect(440,400,260,440,0)
				],

				entities:[new Badguy2(320,420,50,"left"),
				new Badguy2(80,360,50,"right"),
				new Badguy2(270,290,50,"right"),
				new Badguy2(80,230,50,"right"),
				new Badguy2(270,160,50,"right")],

				transitions:[new TransitionRect(660,300,10,150,9,0,60),
				new TransitionRect(-20,20,10,150,11,0,600)]
			},
			11:{
				terrain:[new TerrainRect(520,120,160,20,0),
				new TerrainRect(580,140,160,20,0),

				new TerrainRect(520,260,160,20,0),
				new TerrainRect(540,280,160,20,0),
				new TerrainRect(360,190,110,20,0),

				new TerrainRect(0,0,90,280,0),
				new TerrainRect(0,0,40,680,0),
				new TerrainRect(0,560,160,120,0)
				],

				entities:[new Boss(120,500)],

				transitions:[new TransitionRect(660,-20,10,150,10,0,0)
				]
			},
			100:{
				terrain:[new TerrainRect(0,560,660,40,0)
				],

				entities:[],

				transitions:[
				]
			},
			101:{
				terrain:[new TerrainRect(0,560,660,40,0),
				new TerrainRect(320,510,200,50,0),
				new TerrainRect(520,230,200,50,0)
				,new TerrainRect(490,280,220,50,0),new TerrainRect(460,330,240,50,0)
				,new TerrainRect(430,380,260,50,0),new TerrainRect(400,430,280,50,0)
				,new TerrainRect(370,480,400,330,0),new TerrainRect(550,200,400,330,0)
				,new TerrainRect(580,160,400,330,0),new TerrainRect(610,120,400,330,0)
				],

				entities:[],

				transitions:[new TransitionRect(660,20,10,150,1,0,0)
				]
			},

		};
	};
};