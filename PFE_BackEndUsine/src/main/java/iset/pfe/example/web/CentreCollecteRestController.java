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
import iset.pfe.example.entities.CentreCollecte;
import iset.pfe.example.repositories.CentreCollecteRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CentreCollecteRestController {

	@Autowired
	private CentreCollecteRepository centreCollecteRepository;
	
	@RequestMapping(value="/centre",method = RequestMethod.GET)
	public List<CentreCollecte> getCentres(){
		return centreCollecteRepository.findAll();
	}
	
	@RequestMapping(value="/nbreC",method = RequestMethod.GET)
	public int getNbCentre(){
		return centreCollecteRepository.findAll().size();
	}
	
	@RequestMapping(value="/centres/{nomCentre}",method = RequestMethod.GET)
	public int getCollUtilise(@PathVariable String nomCentre){
		int msg=0;
		for(int i=0;i<centreCollecteRepository.findAll().size();i++) {
			CentreCollecte t=centreCollecteRepository.findAll().get(i);
			if(nomCentre.equals(t.getNomCentre())) {
				msg=1;
			}
			
		}
		return msg;
	}
	
	@RequestMapping(value="/centre/{idCentre}",method = RequestMethod.GET)
    public CentreCollecte getCentre(@PathVariable Integer idCentre) {
		Optional<CentreCollecte> usine = centreCollecteRepository.findById(idCentre);
		if (usine.isPresent()) { 
			return usine.get();
		}else throw new RuntimeException("cnetre introuvable !!");
	}
	
	@RequestMapping(value="/centre/{idCentre}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteCentre(@PathVariable Integer idCentre) {
		Optional<CentreCollecte> u= centreCollecteRepository.findById(idCentre);
				if (u.isPresent()) { 
					centreCollecteRepository.deleteById(idCentre);
		    }else throw new RuntimeException("Centre introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	
	@RequestMapping(value="/centre",method = RequestMethod.POST)
		public CentreCollecte AddCentre(@RequestBody CentreCollecte centre){
		return centreCollecteRepository.save(centre);
	}
	
	@RequestMapping(value="/centre/{idCentre}",method = RequestMethod.PUT)
	public CentreCollecte EditCentre(@PathVariable Integer idCentre, @RequestBody CentreCollecte centres){
		CentreCollecte u= centreCollecteRepository.findById(idCentre).orElseThrow(()->new ResourceNotFoundException("Cet centre n'existe pas"));
    	u.setAdresse(centres.getAdresse());
		u.setNomCentre(centres.getNomCentre());
		u.setVille(centres.getVille());
		centreCollecteRepository.save(u);
			
	  	return u;
    }
	
}
