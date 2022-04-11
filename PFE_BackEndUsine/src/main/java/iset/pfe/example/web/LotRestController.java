package iset.pfe.example.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
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

import iset.pfe.example.entities.CentreCollecte;
import iset.pfe.example.entities.Lot;
import iset.pfe.example.repositories.CentreCollecteRepository;
import iset.pfe.example.repositories.LotRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class LotRestController {

	@Autowired
	private LotRepository lotRepository;
	
	@RequestMapping(value="/lot",method = RequestMethod.GET)
	public List<Lot> getlots(){
		return lotRepository.findAll();
	}
	
	@RequestMapping(value="/lotDispo",method = RequestMethod.GET)
	public List<Lot> getlotsDispo(){
	return lotRepository.getLotDispo();
	}
	
	@RequestMapping(value="/nbreL",method = RequestMethod.GET)
	public int getNblot(){
		return lotRepository.findAll().size();
	}
	
	@RequestMapping(value="/lot/{idCentre}",method = RequestMethod.GET)
    public Lot getlot(@PathVariable Integer idCentre) {
		Optional<Lot> lot= lotRepository.findById(idCentre);
		if (lot.isPresent()) { 
			return lot.get();
		}else throw new RuntimeException("lot introuvable !!");
	}
	
	@RequestMapping(value="/lot/{idCentre}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deletelot(@PathVariable Integer idCentre) {
		Optional<Lot> u= lotRepository.findById(idCentre);
				if (u.isPresent()) { 
					lotRepository.deleteById(idCentre);
		    }else throw new RuntimeException("lot introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	
	@RequestMapping(value="/lot",method = RequestMethod.POST)
		public Lot Addlot(@RequestBody Lot lot){
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
		lot.setDate(currentDateTime);
		return lotRepository.save(lot);
	}
	
	@RequestMapping(value="/lot/{idCentre}",method = RequestMethod.PUT)
	public Lot Editlot(@PathVariable Integer idCentre, @RequestBody Lot lots){
		Lot u= lotRepository.findById(idCentre).orElseThrow(()->new ResourceNotFoundException("Cet centre n'existe pas"));
//    	u.setDate(lots.getDate());
    	u.setDescription(lots.getDescription());
    	u.setType(lots.getType());
		lotRepository.save(u);
			
	  	return u;
    }
	
}

