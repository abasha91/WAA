/**
 * THIS FILE HAS ALL FUNCTIONNALITY NEED TO: ADD, UPDATE, AND GET PERSONS LIST
 */


function cleanRightPart(){
	$("#rightPart").html("");
}

$(document).ready(function(){
	/* FUNCTION TO RETURN THE ALL PERSONS */
	function getPersons(){
		cleanRightPart();
		
		$.ajax({
	        type:'GET',
	        url:'getPersonList',
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
	   				result += "<tr><td id='personID'>"+value.id+"</td>";
	   				result += "<td id='firstNameField'>"+value.firstName+"</td>";
	   				result += "<td id='lastNameField'>"+value.lastName+"</td>";
	   				result += "<td id='emailField'>"+value.email+"</td>";
	   				result += "<td id='phoneField'>"+value.phone+"</td>";
	   				result += "<td id='countryField'>"+value.address.country+"</td>";
	   				result += "<td id='cityField'>"+value.address.city+"</td>";
	   				result += "<td id='stateField'>"+value.address.state+"</td>";
	   				result += "<td id='zipcodeField'>"+value.address.zipcode+"</td>";
	   				result += "<td><a href='#' id='editPerson'> Edit</a></td></tr>";
	   			});
	   			
	   			$("#rightPart").append(result+"</table><a href='#' id='addPerson'>Add person</a>");
	        }
	    });	
	}
	
	/* CALLING ALL PERSONS FUNCTION */
	$("#personList").click(getPersons);
	
	
	/* FUNCTION TO ADD NEW PERSON :
	 *  UI PART - JUST TO DROW THE INPUT FORMS*/
	$("#rightPart").on("click" , "#addPerson", function(){
		$("#personsTable").last("tr").after().append("<tr> \
				<td id='personID'></td>\
				<td id='firstNameField'><input id='firstName' /></td>\
				<td id='lastNameField'><input id='lastName' /></td>\
				<td id='emailField'><input id='email' /></td>\
				<td id='phoneField'><input id='phone' /></td>\
				<td id='countryField'><input id='country' /></td>\
				<td id='cityField'><input id='city' /></td>\
				<td id='stateField'><input id='state' /></td>\
				<td id='zipcodeField'><input id='zipcode' /></td>\
				<td><button id='savePerson'>Add</button></td>\
			</tr>");
	});
	
	
	
	/* FUNCTION TO EDIT PERSON :
	 *  UI PART - JUST TO DROW THE INPUT FORMS*/
	$("#rightPart").on("click" , "#editPerson", function(){
		var _tr = $(this).closest("tr");
		var data = {};
		var dataAddress = {};
		
		data['firstName'] = $(_tr).find("#firstNameField").text();
		data['lastName'] = $(_tr).find("#lastNameField").text();
		data['email'] = $(_tr).find("#emailField").text();
		data['phone'] = $(_tr).find("#phoneField").text();
		
		dataAddress['country'] = $(_tr).find("#countryField").text();
		dataAddress['city'] = $(_tr).find("#cityField").text();
		dataAddress['state'] = $(_tr).find("#stateField").text();
		dataAddress['zipcode'] = $(_tr).find("#zipcodeField").text();
		
		data['address'] = dataAddress; 
		
		data['id'] = $(_tr).find("#personID").text();

		$(_tr).html("");
		$(_tr).append(" \
				<td id='personID'>"+data['id']+"</td>\
				<td id='firstNameField'><input id='firstName' value='"+data['firstName']+"' /></td>\
				<td id='lastNameField'><input id='lastName' value='"+data['lastName']+"' /></td>\
				<td id='emailField'><input id='email' value='"+data['email']+"' /></td>\
				<td id='phoneField'><input id='phone' value='"+data['phone']+"' /></td>\
				<td id='countryField'><input id='country' value='"+dataAddress['country']+"' /></td>\
				<td id='cityField'><input id='city' value='"+dataAddress['city']+"' /></td>\
				<td id='stateField'><input id='state' value='"+dataAddress['state']+"' /></td>\
				<td id='zipcodeField'><input id='zipcode' value='"+dataAddress['zipcode']+"' /></td>\
				<td><button id='savePerson'>Update</button></td>\
			");
	});
	
	
	
	/* FUNCTION TO SAVE/UPDATE PERSONS, CALL BACKEND METHOD */
	$("#rightPart").on("click", "#savePerson", function(){
		var _tr = this.closest("tr");
		var dataToSend = {};
		var dataAddress = {};
		
		dataToSend['firstName'] = $(_tr).find("#firstName").val();
		dataToSend['lastName'] = $(_tr).find("#lastName").val();
		dataToSend['email'] = $(_tr).find("#email").val();
		dataToSend['phone'] = $(_tr).find("#phone").val();
		
		dataAddress['country'] = $(_tr).find("#country").val();
		dataAddress['city'] = $(_tr).find("#city").val();
		dataAddress['state'] = $(_tr).find("#state").val();
		dataAddress['zipcode'] = $(_tr).find("#zipcode").val();
		
		dataToSend["address"] = dataAddress;
		
		debugger;
		
		var idVal = $(_tr).find("#personID").text();
		if (idVal.length > 0)
			dataToSend['id'] = idVal;
		
		$.ajax({
             type: "POST",
             contentType: "application/json",
             url: "/savePerson",
             data: JSON.stringify(dataToSend),
             dataType: 'json',
             success: function (data) {
            	 getPersons();
             }
		});
	});
	
});
