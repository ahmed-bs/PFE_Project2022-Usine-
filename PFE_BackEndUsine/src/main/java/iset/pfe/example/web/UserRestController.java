package iset.pfe.example.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import iset.pfe.example.entities.User;
import iset.pfe.example.repositories.UserRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UserRestController {
	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(value="/users",method = RequestMethod.GET)
	public List<User> getidUs(){
		return userRepository.findAll();
	}
		
	@RequestMapping(value="/users/{idU}",method = RequestMethod.GET)
    public User getidU(@PathVariable Integer idU) {
		Optional<User> ag = userRepository.findById(idU);
		if (ag.isPresent()) { 
			return ag.get();
		}else throw new RuntimeException("Chef introuvable !!");
	}
	
	@RequestMapping(value="/getUser/{username}",method = RequestMethod.GET)
    public User getuser(@PathVariable String username) {
		User u=userRepository.findUserWithName(username).get();
		return u;
	}
	
	
	@RequestMapping(value="/users/{idU}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteidU(@PathVariable Integer idU) {
		Optional<User> user = userRepository.findById(idU);
				if (user.isPresent()) { 
				userRepository.deleteById(idU);
		    }else throw new RuntimeException("Chef introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/users",method = RequestMethod.POST)
		public User Addusers(@RequestBody User user ){
		return userRepository.save(user);
	}
	
	@RequestMapping(value="/users/{idU}",method = RequestMethod.PUT)
	
	public User EditChef(@PathVariable Integer idU, @RequestBody User user){
      User ag = userRepository.findById(idU).orElseThrow(()->new ResourceNotFoundException("Cet user n'existe pas"));
    	
    	ag.setCin(user.getCin());
    	ag.setNom(user.getNom());
    	ag.setPrenom(user.getPrenom());
    	ag.setUsername(user.getUsername());
    	ag.setTel(user.getTel());
    	ag.setPassword(user.getPassword());
    	ag.setUsineNom(user.getUsineNom());
		userRepository.save(ag);
			
	  	return ag;
    }
	

}

