'use strict';














setInterval(function(){
	let time=new Date
	$("#timestring").text(time.toLocaleTimeString())
console.log(time.toLocaleTimeString())
	$("#strelka").css("transform","rotate("+time.getSeconds()*6+"deg)")
	$("#circleMin").css("transform","rotate("+time.getMinutes()*6+"deg)")
	$("#circleHours").css("transform","rotate("+time.getHours()*15+"deg)")
	
	
},1000)
