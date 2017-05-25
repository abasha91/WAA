package edu.mum.coffee.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import edu.mum.coffee.domain.Person;
import edu.mum.coffee.domain.Product;
import edu.mum.coffee.service.PersonService;

@Controller
public class PersonsController {

	@Autowired
	private PersonService personService;
	
	
	// GET
	@RequestMapping(value="/getPersonList", method = RequestMethod.GET)
	public @ResponseBody List<Person> getPersonList() {
        return this.personService.getAllPersons();
	}
	
	
	// ADD AND UPDATE
	@RequestMapping(value = "/savePerson", method = RequestMethod.POST)
    public @ResponseBody String savePerson(@RequestBody Person personForm) {
		
		Person addedPerson = personService.savePerson(personForm);
		
        return addedPerson.getId()+"";
    }
	
	
	// My profile - for users
	@RequestMapping(value="/myProfile", method = RequestMethod.GET)
	public String myProfile(Principal principal, Model model) {
		
		List<Person> personsList = personService.findByEmail(principal.getName());
		Person currentPerson = personsList.get(0);
		model.addAttribute("person", currentPerson);
		
        return "myProfile"; 
	}

	@RequestMapping(value = "/updatePerson", method = RequestMethod.POST)
	public String saveUser(@ModelAttribute("person") Person person, Model model,Principal principal) {
		
	    personService.savePerson(person);
	    
	    return "redirect:/home";
	}
}
