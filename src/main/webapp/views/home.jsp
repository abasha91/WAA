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
<title>Insert title here</title>
</head>
<body>
	You can choose any presentation framework that could be integrated with
	Spring
	<p>
	<p>
		The only user is "<b>super</b>" and the password is "<b>pw</b>"
	<p>
		<a href="<c:url value="/secure" />"> Go to Secure Area </a>
	</p>
	
	<p>
		<a href="<c:url value="/myProfile" />"> My profile for user </a>
	</p>	
		
	<table>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Description</th>
			<th>Price</th>
			<th>productType</th>
		</tr>
		
		<c:forEach var="product" items="${products}" >
			<tr>
				<td>${product.id }</td>
				<td>${product.productName }</td>
				<td>${product.description }</td>
				<td>${product.price }</td>
				<td>${product.productType }</td>
				<td><a href="/addToOrder/${product.id }">Add To Order</a></td>
			</tr>
		</c:forEach> 
	</table>
	
	<a href="/makeOrder">Order !</a>
</body>
</html>