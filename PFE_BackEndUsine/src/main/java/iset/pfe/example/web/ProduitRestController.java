package iset.pfe.example.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import iset.pfe.example.entities.Lot;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.repositories.LotRepository;
import iset.pfe.example.repositories.ProduitRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class ProduitRestController {
	@Autowired
	private ProduitRepository produitRepository;
	
	//getALL Nourritures method
	@RequestMapping(value="/produits",method = RequestMethod.GET)
	public List<Produit> getNourritures(){
		return produitRepository.findAll();
	}
	
	@RequestMapping(value="/nbreP",method = RequestMethod.GET)
	public int getNbNourritures(){
		return produitRepository.findAll().size();
	}
		
	//get Nourriture ById method
	@RequestMapping(value="/produits/{idProduit}",method = RequestMethod.GET)
	public Produit getNourriture(@PathVariable Integer idProduit) {
	Optional<Produit> produit = produitRepository.findById(idProduit);
		if (produit.isPresent()) { 
			return produit.get();
		}else throw new RuntimeException("Produit introuvable !!");
	}
		
	//delete Nourriture method
	@RequestMapping(value="/produits/{idProduit}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteNourriture(@PathVariable Integer idProduit) {
		Optional<Produit> produit = produitRepository.findById(idProduit);
			if (produit.isPresent()) { 
				produitRepository.deleteById(idProduit);
			}else throw new RuntimeException("Produit introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
	//create new Nourriture method 
	@RequestMapping(value="/produits",method = RequestMethod.POST)
		public Produit AddNourriture(@RequestBody Produit produit ){
		produit.setQte(0);
			return produitRepository.save(produit);
		}
		
	//update a Nourriture method
	@RequestMapping(value="/produits/{idProduit}",method = RequestMethod.PUT)
	public ResponseEntity<Produit> EditNourriture(@PathVariable Integer idProduit, @RequestBody Produit produits){
		 return ResponseEntity.ok(produitRepository.save(produits));

	    }
		
}
