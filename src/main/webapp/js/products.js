/**
 * THIS FILE RELEATED TO THE PRODUCTS ACTION (ADD, UPDATE, DELETE, AND GET) 
 */

function cleanRightPart(){
	$("#rightPart").html("");
}

$(document).ready(function(){
	/* FUNCTION TO RETURN THE ALL PRODUCTS */
	function getProductes(){
		cleanRightPart();
		
		$.ajax({
	        type:'GET',
	        url:'getProductList',
	        success:function(data){
	   			var result = "<table id='productsTable'><tr><td>ID</td>\
	   								<td>Name</td>\
	   								<td>Discription</td>\
	   								<td>Price</td>\
	   								<td>Type</td>\
	   								<td>Actions</td>\
	   								</tr>";
	   			$.each(data, function(index,value){
	   				result += "<tr><td id='productID'>"+value.id+"</td>";
	   				result += "<td id='nameField'>"+value.productName+"</td>";
	   				result += "<td id='descriptionField'>"+value.description+"</td>";
	   				result += "<td id='priceField'>"+value.price+"</td>";
	   				result += "<td id='productTypeField'>"+value.productType+"</td>";
	   				result += "<td><a href='#' id='editProduct'> Edit</a> <a href='#' id='deleteProduct'> Delete</a></td></tr>";
	   			});
	   			
	   			$("#rightPart").append(result+"</table><a href='#' id='addProduct'>Add product</a>");
	        }
	    });	
	}
	
	/* CALLING ALL PRODUCTS FUNCTION */
	$("#productList").click(getProductes);
	
	
	/* FUNCTION TO ADD NEW PRODUCT :
	 *  UI PART - JUST TO DROW THE INPUT FORMS*/
	$("#rightPart").on("click" , "#addProduct", function(){
		$("#productsTable").last("tr").after().append("<tr> \
				<td id='productID'></td>\
				<td id='nameField'><input id='name' /></td>\
				<td id='descriptionField'><input id='description' /></td>\
				<td id='priceField'><input id='price' /></td>\
				<td id='productTypeField'><select id='productType'><option value='BREAKFAST'>BREAKFAST</option><option value='LUNCH'>LUNCH</option><option value='DINNER'>DINNER</option></select></td>\
				<td><button id='saveProduct'>Add</button></td>\
			</tr>");
	});
	
	
	
	/* FUNCTION TO EDIT PRODUCT :
	 *  UI PART - JUST TO DROW THE INPUT FORMS*/
	$("#rightPart").on("click" , "#editProduct", function(){
		
		var _tr = $(this).closest("tr");
		var data = {};
		data['productName'] = $(_tr).find("#nameField").text();
		data['description'] = $(_tr).find("#descriptionField").text();
		data['price'] = $(_tr).find("#priceField").text();
		data['productType'] = $(_tr).find("#productTypeField").text();
		data['id'] = $(_tr).find("#productID").text();

		$(_tr).html("");
		$(_tr).append(" \
				<td id='productID'>"+data['id']+"</td>\
				<td id='nameField'><input id='name' value='"+data['productName']+"' /></td>\
				<td id='descriptionField'><input id='description' value='"+data['description']+"' /></td>\
				<td id='priceField'><input id='price' value='"+data['price']+"' /></td>\
				<td id='productTypeField'><select id='productType'><option value='BREAKFAST' "+((data['productType'] == 'BREAKFAST') ? "selected" : "") +">BREAKFAST</option>\
										<option value='LUNCH' "+((data['productType'] == 'LUNCH') ? "selected" : "") +">LUNCH</option>\
										<option value='DINNER' "+((data['productType'] == 'DINNER') ? "selected" : "") +">DINNER</option></select></td>\
				<td><button id='saveProduct'>Update</button></td>\
			");
	});
	
	
	
	/* FUNCTION TO SAVE/UPDATE PRODCUTS, CALL BACKEND METHOD */
	$("#rightPart").on("click", "#saveProduct", function(){
		var _tr = this.closest("tr");
		var dataToSend = {};
		dataToSend['productName'] = $(_tr).find("#name").val();
		dataToSend['description'] = $(_tr).find("#description").val();
		dataToSend['price'] = $(_tr).find("#price").val();
		dataToSend['productType'] = $(_tr).find("#productType").val();
		
		var idVal = $(_tr).find("#productID").text();
		if (idVal.length > 0)
			dataToSend['id'] = idVal;
		
		$.ajax({
             type: "POST",
             contentType: "application/json",
             url: "/saveProduct",
             data: JSON.stringify(dataToSend),
             dataType: 'json',
             success: function (data) {
            	 
            	 $(_tr).html("");
            	 $(_tr).append("<td>"+data+"</td> \
	   				<td>"+dataToSend['productName']+"</td> \
	   				<td>"+dataToSend['description']+"</td> \
	   				<td>"+dataToSend['price']+"</td>\
	   				<td>"+dataToSend['productType']+"</td> \
	   				<td><a href='#' id='editProduct'> Edit</a> <a href='#' id='deleteProduct'> Delete</a></td>");
            	 
            	 alert("add Succssfully");
             }
		});
	});
	
	
	/* TO DELETE PRODUCT */
	$("#rightPart").on("click", "#deleteProduct", function(){
		var _tr = this.closest("tr");
		var id = $(_tr).find("#productID").text()
		
		$.ajax({
             type: "GET",
             contentType: "application/json",
             url: "/deleteProduct",
             data: {id: id},
             success: function (data) {
            	 $(_tr).remove();
            	 alert("Deleted Succssfully");
             },
             error: function(dataError){
            	 alert("you can't delete this row as its selected at least once in one of the orders!")
             }
		});
	});
	
});
