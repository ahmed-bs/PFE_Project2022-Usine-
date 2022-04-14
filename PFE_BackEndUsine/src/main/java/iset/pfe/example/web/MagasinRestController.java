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
import iset.pfe.example.entities.Magasin;
import iset.pfe.example.repositories.MagasinRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class MagasinRestController {
	@Autowired
	private MagasinRepository magasinRepository;
	
	@RequestMapping(value="/magasin",method = RequestMethod.GET)
	public List<Magasin> getMagasins(){
		return magasinRepository.findAll();
	}
	
	@RequestMapping(value="/nbreM",method = RequestMethod.GET)
	public int getNbMagasin(){
		return magasinRepository.findAll().size();
	}
	
	@RequestMapping(value="/magasin/{idMag}",method = RequestMethod.GET)
    public Magasin getMagasin(@PathVariable Integer idMag) {
		Optional<Magasin> mag= magasinRepository.findById(idMag);
		if (mag.isPresent()) { 
			return mag.get();
		}else throw new RuntimeException("Magasin introuvable !!");
	}
	
	@RequestMapping(value="/magasin/{idMag}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteMagasin(@PathVariable Integer idMag) {
		Optional<Magasin> u= magasinRepository.findById(idMag);
				if (u.isPresent()) { 
					magasinRepository.deleteById(idMag);
		    }else throw new RuntimeException("Magasin introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	
	@RequestMapping(value="/magasin",method = RequestMethod.POST)
		public Magasin AddMagasin(@RequestBody Magasin magasin){
		return magasinRepository.save(magasin);
	}
	
	@RequestMapping(value="/magasin/{idMag}",method = RequestMethod.PUT)
	public Magasin EditMagasin(@PathVariable Integer idMag, @RequestBody Magasin magasin){
		Magasin u= magasinRepository.findById(idMag).orElseThrow(()->new ResourceNotFoundException("Cet centre n'existe pas"));
    	u.setAdresse(magasin.getAdresse());
    	u.setNomMag(magasin.getNomMag());
    	u.setVille(magasin.getVille());
		magasinRepository.save(u);
			
	  	return u;
    }
	
}

