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

import iset.pfe.example.entities.Plateau;
import iset.pfe.example.repositories.PlateauRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class PlateauRestController {
	
	@Autowired
	private PlateauRepository plateauRepository;
			//getALL plateaux method
			@RequestMapping(value="/plateaux",method = RequestMethod.GET)
			public List<Plateau> getPlateaux(){
				return plateauRepository.findAll();
			}
			//get Plateau ById method
			@RequestMapping(value="/plateaux/{idPlateau}",method = RequestMethod.GET)
			public Plateau getPlateau(@PathVariable Integer idPlateau) {
			Optional<Plateau> plateau = plateauRepository.findById(idPlateau);
				if (plateau.isPresent()) { 
					return plateau.get();
				}else throw new RuntimeException("Plateau introuvable !!");
			}
			
			//delete Plateau method
			@RequestMapping(value="/plateaux/{idPlateau}",method = RequestMethod.DELETE)
			@ResponseBody
			public void deletePlateau(@PathVariable Integer idPlateau) {
				Optional<Plateau> plateau = plateauRepository.findById(idPlateau);
					if (plateau.isPresent()) { 
						plateauRepository.deleteById(idPlateau);
					}else throw new RuntimeException("Plateau introuvable ! vous ne pouvez pas le supprimer !!");
				}
			//create new Plateau method 
			@RequestMapping(value="/plateaux",method = RequestMethod.POST)
				public Plateau AddPlateau(@RequestBody Plateau plateau ){
					return plateauRepository.save(plateau);
				}
			//update a Plateau method
			//????
			@RequestMapping(value="/plateaux/{idPlateau}",method = RequestMethod.PUT)
			public Plateau EditPlateau(@PathVariable Integer idPlateau, @RequestBody Plateau plateaux){
				Plateau plateau = plateauRepository.findById(idPlateau).orElseThrow(()->new ResourceNotFoundException("Cet Plateau n'existe pas"));
				plateau.setDate_Emballage(plateaux.getDate_Emballage());	
				plateau.setQuantite(plateaux.getQuantite());
				plateauRepository.save(plateau);
				return plateau;
			    }
			
			
			
}
