//arc of chicken: [[1],[0,290,4] ], [[1],[0,240,4] ] , [[1],[0,200,4] ],[[1],[0,200,4] ], [[1],[0,240,4] ], [[1],[0,290,4] ], [[222],[0,300,4] ],
//vertical enemies:  [[1],[0,0,250,4],[0,0,290,4],[0,0,330,4],[0,0,370,4],[0,0,410,4],[0,0,450,4],[0,0,490,4],[0,0,530,4],[0,0,570,4],[0,0,610,4] ],
/*rectangle
[[1],[0,0,330,4]],
[[1],[0,0,290,4],[0,0,330,4],[0,0,370,4]],
[[1],[0,0,250,4],[0,0,290,4],[0,0,330,4],[0,0,370,4],[0,0,410,4]],
[[1],[0,0,290,4],[0,0,330,4],[0,0,370,4]],
[[1],[0,0,330,4]],
end rectangle */

var s=4;
var xadjust=-115;
var xadjust2=-135;
mapData= {	2:{ interval:[10],objects:[ 

	[[3],[0,0,400,4] ],
	[[1],[0,0,30,4],[0,0,70,4],[0,0,110,4],[0,0,150,4],[0,0,190,4],[0,0,230,4],[0,0,270,4],[1,0,370,4],[0,0,470,4],[0,0,510,4],[0,0,550,4],[0,0,590,4],[0,0,630,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,30-100,4],[0,0,70-100,4],[0,0,110-100,4],[0,0,150-100,4],[0,0,190-100,4],[0,0,230-100,4],[0,0,270-100,4],[0,0,470-100,4],[0,0,510-100,4],[0,0,550-100,4],[0,0,590-100,4],[0,0,630-100,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,30,4],[0,0,70,4],[0,0,110,4],[0,0,150,4],[0,0,190,4],[0,0,230,4],[0,0,270,4],[1,0,370,4],[0,0,470,4],[0,0,510,4],[0,0,550,4],[0,0,590,4],[0,0,630,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,30-100,4],[0,0,70-100,4],[0,0,110-100,4],[0,0,150-100,4],[0,0,190-100,4],[0,0,230-100,4],[0,0,270-100,4],[0,0,470-100,4],[0,0,510-100,4],[0,0,550-100,4],[0,0,590-100,4],[0,0,630-100,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,30,4],[0,0,70,4],[0,0,110,4],[0,0,150,4],[0,0,190,4],[0,0,230,4],[0,0,270,4],[1,0,370,4],[0,0,470,4],[0,0,510,4],[0,0,550,4],[0,0,590,4],[0,0,630,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,170,4],[0,0,210,4],[0,0,250,4],[0,0,290,4],[0,0,330,4],[0,0,370,4],[0,0,410,4],[0,0,450,4],[0,0,490,4],[0,0,530,4],[0,0,570,4],[0,0,610,4] ],
	[[3],[0,0,900,4] ],	
	[[1],[0,0,170-170,4],[0,0,210-170,4],[0,0,250-170,4],[0,0,290-170,4],[0,0,330-170,4],[0,0,370-170,4],[0,0,410-170,4],[0,0,450-170,4],[0,0,490-170,4],[0,0,530-170,4],[0,0,570-170,4],[0,0,610-170,4] ],
	
	[[3],[0,0,900,4] ],
	[[1],[0,0,30,4],[0,0,70,4],[0,0,110,4],[0,0,150,4],[0,0,190,4],[0,0,230,4],[0,0,270,4],[1,0,370,4],[0,0,470,4],[0,0,510,4],[0,0,550,4],[0,0,590,4],[0,0,630,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,30-100,4],[0,0,70-100,4],[0,0,110-100,4],[0,0,150-100,4],[0,0,190-100,4],[0,0,230-100,4],[0,0,270-100,4],[0,0,470-100,4],[0,0,510-100,4],[0,0,550-100,4],[0,0,590-100,4],[0,0,630-100,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,30,4],[0,0,70,4],[0,0,110,4],[0,0,150,4],[0,0,190,4],[0,0,230,4],[0,0,270,4],[1,0,370,4],[0,0,470,4],[0,0,510,4],[0,0,550,4],[0,0,590,4],[0,0,630,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,30-100,4],[0,0,70-100,4],[0,0,110-100,4],[0,0,150-100,4],[0,0,190-100,4],[0,0,230-100,4],[0,0,270-100,4],[0,0,470-100,4],[0,0,510-100,4],[0,0,550-100,4],[0,0,590-100,4],[0,0,630-100,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,30,4],[0,0,70,4],[0,0,110,4],[0,0,150,4],[0,0,190,4],[0,0,230,4],[0,0,270,4],[1,0,370,4],[0,0,470,4],[0,0,510,4],[0,0,550,4],[0,0,590,4],[0,0,630,4]],
	[[3],[0,0,900,4] ],
	[[1],[0,0,170,4],[0,0,210,4],[0,0,250,4],[0,0,290,4],[0,0,330,4],[0,0,370,4],[0,0,410,4],[0,0,450,4],[0,0,490,4],[0,0,530,4],[0,0,570,4],[0,0,610,4] ],
	[[3],[0,0,900,4] ],	

						[[31],[0,0,900,4] ],
						] 
			},

			1:{
				interval:[10],
				objects:[   

						  
						  [[1],[0,0,900,4] ], 



						  [[1],[0,0,330,4]],
						  [[1],[0,0,290,4],[0,0,330,4],[0,0,370,4]],
						  [[1],[0,0,250,4],[0,0,290,4],[0,0,330,4],[0,0,370,4],[0,0,410,4]],
						  [[1],[0,0,290,4],[0,0,330,4],[0,0,370,4]],
						  [[1],[0,0,330,4]],

						  [[4],[0,0,900,4] ], 

						  [[1],[0,0,330+120,4]],
						  [[1],[0,0,290+120,4],[0,0,330+120,4],[0,0,370+120,4]],
						  [[1],[0,0,250+120,4],[0,0,290+120,4],[0,0,330+120,4],[0,0,370+120,4],[0,0,410+120,4]],
						  [[1],[0,0,290+120,4],[0,0,330+120,4],[0,0,370+120,4]],
						  [[1],[0,0,330+120,4]],

						  [[4],[0,0,900,4] ], 

						  [[1],[0,0,330-120,4]],
						  [[1],[0,0,290-120,4],[0,0,330-120,4],[0,0,370-120,4]],
						  [[1],[0,0,250-120,4],[0,0,290-120,4],[0,0,330-120,4],[0,0,370-120,4],[0,0,410-120,4]],
						  [[1],[0,0,290-120,4],[0,0,330-120,4],[0,0,370-120,4]],
						  [[1],[0,0,330-120,4]],

						  [[4],[0,0,900,4] ], 

						  [[1],[0,0,330+120,4]],
						  [[1],[0,0,290+120,4],[0,0,330+120,4],[0,0,370+120,4]],
						  [[1],[0,0,250+120,4],[0,0,290+120,4],[0,0,330+120,4],[0,0,370+120,4],[0,0,410+120,4]],
						  [[1],[0,0,290+120,4],[0,0,330+120,4],[0,0,370+120,4]],
						  [[1],[0,0,330+120,4]],

						  [[4],[0,0,900,4] ], 

						  [[1],[0,0,330-120,4]],
						  [[1],[0,0,290-120,4],[0,0,330-120,4],[0,0,370-120,4]],
						  [[1],[0,0,250-120,4],[0,0,290-120,4],[0,0,330-120,4],[0,0,370-120,4],[0,0,410-120,4]],
						  [[1],[0,0,290-120,4],[0,0,330-120,4],[0,0,370-120,4]],
						  [[1],[0,0,330-120,4]],




						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ], 
						  [[3],[0,0,900,4] ],[[1],[1,0,100,4] ],  [[3],[0,0,900,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ], 
						  [[3],[0,0,900,4] ],[[1],[1,0,100,4] ],  [[3],[0,0,900,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ], 
						  [[3],[0,0,900,4] ],[[1],[1,0,100,4] ],  [[3],[0,0,900,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ], 

						  [[6],[0,0,900,4] ], 
						  [[1],[0,0,220,4],[0,0,260,4],[0,0,300,4],[0,0,340,4],[0,0,380,4],[0,0,420,4],[0,0,460,4],[1,0,100,4]], 
						  [[3],[0,0,900,4] ],  [[3],[0,0,900,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ], 
						  [[3],[0,0,900,4] ],  [[3],[0,0,900,4] ], 
						  [[1],[0,0,220,4],[0,0,260,4],[0,0,300,4],[0,0,340,4],[0,0,380,4],[0,0,420,4],[0,0,460,4],[1,0,100,4]],  
						  [[3],[0,0,900,4] ],  [[3],[0,0,900,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ],  

						  [[6],[0,0,900,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[3],[0,0,600,4] ],[[1],[1,0,800,4] ],  [[3],[0,0,600,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[3],[0,0,600,4] ],[[1],[1,0,800,4] ],  [[3],[0,0,600,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[3],[0,0,600,4] ],[[1],[1,0,800,4] ],  [[3],[0,0,600,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 

						  [[10],[0,0,250,4],[1,0,420,4],[1,0,460,4]], 
						  [[1],[1,0,120,4],[1,0,80,4]], 
						  [[10],[0,0,250,4],[1,0,420,4],[1,0,460,4]], 
						  [[1],[1,0,120,4],[1,0,80,4]], 
						  [[10],[0,0,250,4],[1,0,420,4],[1,0,460,4]], 

						  [[6],[0,0,900,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[4],[0,0,900,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ], 
						  [[4],[0,0,900,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[4],[0,0,900,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ], 
						  [[4],[0,0,900,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[4],[0,0,900,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[1,0,420,4] ], 
						  [[20],[0,0,600,4] ], 
						  			
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 

						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,20,4],[0,0,60,4],[0,0,100,4],[0,0,140,4],[0,0,180,4],[0,0,220,4],[0,0,260,4],[0,0,300,4],[1,0,420,4] ], 
						  [[2],[0,0,600,4] ], 
						  [[1],[0,0,600,4],[0,0,560,4],[0,0,520,4],[0,0,480,4],[0,0,440,4],[0,0,400,4],[0,0,360,4],[1,0,300,4] ], 
						  [[10],[1,0,300,4] ], 



						  /*[[1],[0,250-250,4],[0,290-250,4],[0,330-250,4],[0,370-250,4],[0,410-250,4],[0,450-250,4],[0,490-250,4],[0,530-250,4],[0,570-250,4],[0,610-250,4] ], 
						  [[1],[0,250-250,4],[0,290-250,4],[0,330-250,4],[0,370-250,4],[0,410-250,4],[0,450-250,4],[0,490-250,4],[0,530-250,4],[0,570-250,4],[0,610-250,4] ], 

						  // hole in middle
						  [[1],[0,370+30,4],[0,410+30,4],[0,450+30,4],[0,490+30,4],[0,530+30,4],[0,570+30,4],[0,610+30,4],[0,250-250,4],[0,290-250,4],[0,330-250,4],[0,370-250,4],[0,410-250,4],[0,450-250,4] ], 
						  [[1],[0,370+120,4],[0,410+120,4],[0,450+120,4],[0,490+120,4],[0,530+120,4],[0,570+120,4],[0,610+120,4],[0,-30+120,4],[0,10+120,4],[0,50+120,4],[0,90+120,4],[0,140+120,4],[0,170+120,4] ],

						  [[1],[0,250+30,4],[0,290+30,4],[0,330+30,4],[0,370+30,4],[0,410+30,4],[0,450+30,4],[0,490+30,4],[0,530+30,4],[0,570+30,4],[0,610+30,4] ], 
						  [[1],[0,250-250,4],[0,290-250,4],[0,330-250,4],[0,370-250,4],[0,410-250,4],[0,450-250,4],[0,490-250,4],[0,530-250,4],[0,570-250,4],[0,610-250,4] ], 

						  // hole in middle
						  [[1],[0,370+30,4],[0,410+30,4],[0,450+30,4],[0,490+30,4],[0,530+30,4],[0,570+30,4],[0,610+30,4],[0,250-250,4],[0,290-250,4],[0,330-250,4],[0,370-250,4],[0,410-250,4],[0,450-250,4] ], 
						  [[1],[0,370+120,4],[0,410+120,4],[0,450+120,4],[0,490+120,4],[0,530+120,4],[0,570+120,4],[0,610+120,4],[0,-30+120,4],[0,10+120,4],[0,50+120,4],[0,90+120,4],[0,140+120,4],[0,170+120,4] ],

						 [[1],[0,370+20,4],[0,410+20,4],[0,450+20,4],[0,490+20,4],[0,530+20,4],[0,570+20,4],[0,610+20,4],[0,-30+20,4],[0,10+20,4],[0,50+20,4],[0,90+20,4],[0,140+20,4],[0,170+20,4] ], 
						 [[1],[0,370+120,4],[0,410+120,4],[0,450+120,4],[0,490+120,4],[0,530+120,4],[0,570+120,4],[0,610+120,4],[0,-30+120,4],[0,10+120,4],[0,50+120,4],[0,90+120,4],[0,140+120,4],[0,170+120,4] ],
						
						  [[10],[0,300,4],[0,300,4] ], [[5],[0,100,4],[0,200,4] ] ,
						  [[5],[0,100,4],[0,200,4] ], [[5],[0,100,4],[0,200,4] ] ,
						  [[5],[0,100,4],[0,200,4] ], [[5],[0,100,4],[0,200,4] ] ,
						  [[5],[0,100,4],[0,200,4] ], [[5],[0,100,4],[0,200,4] ] ,
						  [[5],[0,100,4],[0,200,4] ], [[5],[0,100,4],[0,200,4] ] ,*/
				 ],
			},
			3:{ interval:[10],
				objects:[ 
				 [[3],[0,0,900,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,580,4] ],
						[[1],[0,0,320,4] ],
						[[1],[1,0,100,4] ],
						[[1],[0,0,450,4] ],
						[[1],[0,0,340,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,500,4] ],
						[[1],[1,0,380,4] ],
						[[1],[0,0,240,4] ],
						[[1],[0,0,410,4] ],
						[[1],[0,0,30,4] ],
						[[1],[0,0,310,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,430,4] ],
						[[1],[1,0,330,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,500,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,100,4] ],
						[[1],[1,0,230,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,530,4] ],
						[[1],[1,0,430,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,580,4] ],
						[[1],[0,0,320,4] ],
						[[1],[1,0,100,4] ],
						[[1],[0,0,450,4] ],
						[[1],[0,0,340,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,500,4] ],
						[[1],[1,0,380,4] ],
						[[1],[0,0,240,4] ],
						[[1],[0,0,410,4] ],
						[[1],[0,0,30,4] ],
						[[1],[0,0,310,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,430,4] ],
						[[1],[1,0,330,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,500,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,100,4] ],
						[[1],[1,0,230,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,530,4] ],
						[[1],[1,0,430,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,330,4] ],

						[[1],[0,0,230,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,580,4] ],
						[[1],[0,0,320,4] ],
						[[1],[1,0,100,4] ],
						[[1],[0,0,450,4] ],
						[[1],[0,0,340,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,500,4] ],
						[[1],[1,0,380,4] ],
						[[1],[0,0,240,4] ],
						[[1],[0,0,410,4] ],
						[[1],[0,0,30,4] ],
						[[1],[0,0,310,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,430,4] ],
						[[1],[1,0,330,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,500,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,100,4] ],
						[[1],[1,0,230,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,530,4] ],
						[[1],[1,0,430,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,580,4] ],
						[[1],[0,0,320,4] ],
						[[1],[1,0,100,4] ],
						[[1],[0,0,450,4] ],
						[[1],[0,0,340,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,500,4] ],
						[[1],[1,0,380,4] ],
						[[1],[0,0,240,4] ],
						[[1],[0,0,410,4] ],
						[[1],[0,0,30,4] ],
						[[1],[0,0,310,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,430,4] ],
						[[1],[1,0,330,4] ],
						[[1],[0,0,130,4] ],
						[[1],[0,0,500,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,100,4] ],
						[[1],[1,0,230,4] ],
						[[1],[0,0,330,4] ],
						[[1],[0,0,530,4] ],
						[[1],[1,0,430,4] ],
						[[1],[0,0,230,4] ],
						[[1],[0,0,330,4] ],
				] },
			0:{ interval:[10],
				objects:[ 
				[[20],[0,0,900,4] ],
						[[5],[0,0,900,4] ],
						[[1],[1,0,230,4] ],
						[[5],[0,0,900,4] ],
						[[1],[1,0,230,4] ],
						[[5],[0,0,900,4] ],
						[[1],[1,0,230,4] ],
						[[20],[0,0,900,4] ],
						[[1],[1,0,330-100,4],[0,0,470-100,4],[0,0,510-100,4],[0,0,550-100,4],[0,0,590-100,4],[0,0,630-100,4]],
						[[20],[0,0,900,4] ]
				] },
	}





