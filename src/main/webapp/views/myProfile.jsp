<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	
	<a href="/logout">Logout</a>
	
	<form:form action="/updatePerson" method="POST" modelAttribute="person">
		<form:hidden path="id"/>
		<form:hidden path="email"/>
		FirstName:<form:input path="firstName" /> <br />
		LastName:<form:input path="lastName" /><br />
		Phone:<form:input path="phone" /><br />
		Country:<form:input path="address.country" /><br />
		State:<form:input path="address.state" /><br />
		City:<form:input path="address.city" /><br />
		Zipcode:<form:input path="address.zipcode" /><br />
		
		<form:button>Submit</form:button>
	
	</form:form>
	
</body>
</html>