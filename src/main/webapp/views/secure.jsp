<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
	
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
	

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Home Page</title>

<script type="text/javascript" src="/js/jquery-3.2.1.min.js"></script> 

<script type="text/javascript" src="/js/products.js"></script>
<script type="text/javascript" src="/js/persons.js"></script>
<script type="text/javascript" src="/js/orders.js"></script>

<style>

#rightPart{
	width:80%;
	float:right;
	dispaly:block;
	
}

#leftPart {
	width: 20%;
	float: left;
}

table {
	width:100%;
}

</style>

</head>
<body>
	<h1>Admin panel!</h1>
	<a href="<c:url value="/logout" />"> Now logout </a>
	
	<div id="rightPart">
		Welcome to Our CoffeShope
	</div>
	<div id="leftPart">
		<a href="#" id="productList">Products</a> <br />
		<a href="#" id="personList">Persons</a> <br />
		<a href="#" id="orderList">Orders</a>
	</div>
	
	
</body>
</html>
