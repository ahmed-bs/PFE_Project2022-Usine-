package iset.pfe.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import iset.pfe.example.entities.Chef;
import iset.pfe.example.entities.Plateau;
import iset.pfe.example.entities.Stock;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.ChefRepository;
import iset.pfe.example.repositories.PlateauRepository;
import iset.pfe.example.repositories.StockRepository;
import iset.pfe.example.repositories.TankRepository;

@SpringBootApplication
public class PfeBackEndApplication implements CommandLineRunner {

	@Autowired
	private ChefRepository chefRepository;
	@Autowired
	private TankRepository tankRepository;
	@Autowired
	private StockRepository stockRepository;
	@Autowired
	private PlateauRepository plateauRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		Date dateA=new Date("22/03/2021");
		Date dateE=new Date("22/04/2021");
		
		Chef c=new Chef("NOUR", "Guerfali", "Nour@gmail.com", "Bizerte", 11431134, 54546450, "Nour", "1234");
		chefRepository.save(c);
		Tank t1=new Tank(2000.0, 2000.0, dateA);
		tankRepository.save(t1);
		Plateau p1=new Plateau(50, dateE);
		plateauRepository.save(p1);
		Stock s1=new Stock(120.0, 120.0, "intitule", dateA, 12000);
		stockRepository.save(s1);
		
		
	}

}
