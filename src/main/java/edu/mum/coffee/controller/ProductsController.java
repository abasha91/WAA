package edu.mum.coffee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.mum.coffee.domain.Product;
import edu.mum.coffee.service.ProductService;

@Controller
@RestController
public class ProductsController {

	@Autowired
	private ProductService productService;
	
	
	// GET
	@RequestMapping(value="/getProductList", method = RequestMethod.GET)
	public List<Product> getProductList() {
        return this.productService.getAllProduct();
	}
	
	
	// ADD AND UPDATE
	@RequestMapping(value = "/saveProduct", method = RequestMethod.POST)
    public String saveProduct(@RequestBody Product productForm) {
		
		Product addedProduct = productService.save(productForm);
		
        return addedProduct.getId()+"";
    }
	
	// DELETE
	@RequestMapping(value = "/deleteProduct", method = RequestMethod.GET)
    public String deleteProduct(@RequestParam("id") String productId) {
		Product prodcutToDelete = productService.getProduct(Integer.parseInt(productId));
		productService.delete(prodcutToDelete);
        return "";
    }

}
