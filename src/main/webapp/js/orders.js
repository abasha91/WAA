/**
 * THIS FILE TO TAKE CARE OF SHOWING ORDERS LIST
 */


$(document).ready(function(){
	function getPersons(){
		cleanRightPart();
		
		$.ajax({
	        type:'GET',
	        url:'getOrdersList',
	        success:function(data){
	   			var result = "<table id='personsTable'><tr><td>ID</td>\
	   								<td>firstName</td>\
	   								<td>lastName</td>\
	   								<td>email</td>\
	   								<td>phone</td>\
	   								<td>country</td>\
	   								<td>city</td>\
	   								<td>state</td>\
	   								<td>zipCode</td>\
	   								<td>Actions</td>\
	   								</tr>";
	   			$.each(data, function(index,value){
	   				
	   			});
	   			
	   			$("#rightPart").append(result+"</table>");
	        }
	    });	
	}
	
	/* CALLING ALL PERSONS FUNCTION */
	$("#orderList").click(getPersons);
	
});