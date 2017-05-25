package edu.mum.coffee.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.mum.coffee.domain.Order;
import edu.mum.coffee.domain.Person;
import edu.mum.coffee.domain.Product;
import edu.mum.coffee.service.OrderService;
import edu.mum.coffee.service.PersonService;
import edu.mum.coffee.service.ProductService;

@Controller
@Scope("session")
public class OrdersController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private PersonService personService;
	
	@RequestMapping("/addToOrder/{id}")
	public String addToOrder(HttpServletRequest request,@PathVariable(value="id") String id){
		
		
		Product productToAdd = productService.getProduct(Integer.parseInt(id));
		
		List<Product> productsList = (List<Product>) request.getSession().getAttribute("products");
		
		if (productsList != null) {
			productsList.add(productToAdd);
		} else {
			productsList = new ArrayList<>();
			productsList.add(productToAdd);
		}
		request.getSession().setAttribute("products", productsList);

	
		return "redirect:/home";
	}
	
	@RequestMapping("/makeOrder")
	public String makeOrder(Model model,HttpServletRequest request){
		
		List<Product> productsList = (List<Product>) request.getSession().getAttribute("products");

		
		model.addAttribute("products", productsList);
		
		return "orderList";
	}
	
	@RequestMapping("/createOrder")
	public String makeOrder(Model model,HttpServletRequest request, Principal principal){
		
		List<Product> productsList = (List<Product>) request.getSession().getAttribute("products");

		
		Order order = new Order();
		
		order.setOrderLine(productsList);
		
		
		order.setPerson(personService.findByEmail(principal.getName()).get(0));
		order.setOrderDate(new Date());
		Order orderSaved = orderService.save(order);
		if (orderSaved != null) {
			request.getSession().setAttribute("products", null);
		}
		return "orderDone";
	}


	// GET
	@RequestMapping(value="/getOrdersList", method = RequestMethod.GET)
	public @ResponseBody List<Order> getOrdersList() {
        return this.orderService.findAll();
	}
}
