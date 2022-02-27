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

import iset.pfe.example.entities.Stock;
import iset.pfe.example.repositories.StockRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class StockRestController {
	@Autowired
	private StockRepository stockRepository;

		//getALL Stock method
			@RequestMapping(value="/stocks",method = RequestMethod.GET)
			public List<Stock> getStocks(){
				return stockRepository.findAll();
			}
		//get Stock ById method
		@RequestMapping(value="/stocks/{idStock}",method = RequestMethod.GET)
		public Stock getStock(@PathVariable Integer idStock) {
		Optional<Stock> stock = stockRepository.findById(idStock);
			if (stock.isPresent()) { 
				return stock.get();
			}else throw new RuntimeException("Stock introuvable !!");
		}
		//delete Stock method
		@RequestMapping(value="/stocks/{idStock}",method = RequestMethod.DELETE)
		@ResponseBody
		public void deleteStock(@PathVariable Integer idStock) {
			Optional<Stock> stock = stockRepository.findById(idStock);
				if (stock.isPresent()) { 
					stockRepository.deleteById(idStock);
				}else throw new RuntimeException("Stock introuvable ! vous ne pouvez pas le supprimer !!");
			}
		//create new Stock method 
		@RequestMapping(value="/stocks",method = RequestMethod.POST)
			public Stock AddStock(@RequestBody Stock stock ){
				return stockRepository.save(stock);
			}
		//update a Stock method
		//????
		@RequestMapping(value="/stocks/{idStock}",method = RequestMethod.PUT)
		public Stock EditStock(@PathVariable Integer idStock, @RequestBody Stock stocks){
			Stock stock = stockRepository.findById(idStock).orElseThrow(()->new ResourceNotFoundException("Cet Stock n'existe pas"));
			stock.setPoid(stocks.getPoid());
			stock.setDate_Production(stocks.getDate_Production());	
			stock.setVolume(stocks.getVolume());
			stock.setIntitule(stocks.getIntitule());
			stock.setQuantite(stocks.getQuantite());
			stockRepository.save(stock);
			return stock;
		    }
	
}

