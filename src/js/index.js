$('#btn').click(()=>{
			$.ajax({
      		url:"/weather",
      		dataType:'json',
      		data:{
      			appkey:"xxxxxxxxxxxxxxxxxxxxxxxxxx",
      			city:$('#inp').val()
      		},
      		success:function(res){
      			var hourlytemp=res.result.result.hourly;
      			console.log(res.result.result)
      			console.log(res.result.result.hourly)
      			console.log(formatter(hourlytemp).x)
      			console.log(formatter(hourlytemp).y)
      			console.log(formatter(hourlytemp).min,formatter(hourlytemp).max)

      			var mychart=echarts.init($("#box")[0])
      			mychart.setOption(setOpt(formatter(hourlytemp)))
      		}
      	})
      	})

      	var formatter=(arr)=>{
      		var obj={
      			x:[],
      		    y:[],
      		    min:0,
      		    max:0
      		};
      		$.each(arr,(i,v)=>{
      			if(i==0){
      				obj.x.push("now");
      				obj.y.push(v.temp);
      				obj.max=v.temp;
      				obj.min=v.temp;
      			}else if(i%3==0){
      				obj.x.push(v.time.split(":")[0]+"时");
      				obj.y.push(v.temp)
      			}

      			if(v.temp>obj.max){
      				obj.max=v.temp
      			}
      			if(v.temp<obj.min){
      				obj.min=v.temp
      			}
      		})
				
      		return obj;
      	}
        
        function setOpt(obj){
        	var option={
        	title:{
        		text:new Date().toLocaleDateString()+'  24小时内'+$('#inp').val()+'城市温度',
        		textStyle:{
        			color:'tomato'
        		},
        		left:'center',
        		// align:'right'
        	},
        	color:['hotpink'],
        	tooltip:{
      		trigger:'axis',
      		formatter: "Temperature:{c}°C",
      		backgroundColor:'rgba(225,194,50,0.4)',
      		axisPointer:{
      			type:'cross',
      			show:false,
      			label:{
      				color:"#789122"
      			}
      		},
      		backgroundColor:'rgba(50,50,50,0.4)'
      	 },
      		xAxis:{
      			type: 'category',
      			data:obj.x
      		},
      		yAxis:{
      			type:'value',
      			min: function () {
    				return obj.min;
					},
                max: function(){
                	return obj.max
                },
                name:"温度",
                nameTextStyle:{
                	fontSize:18,
                	color:'purple'
                }
      		},

      		series:[{
      			data:obj.y,
      			type:'line'
      		}]
      	};
      	return option
        }
