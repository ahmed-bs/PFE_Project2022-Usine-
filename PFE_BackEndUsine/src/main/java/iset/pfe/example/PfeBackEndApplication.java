package iset.pfe.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import iset.pfe.example.entities.User;
import iset.pfe.example.entities.CentreCollecte;
import iset.pfe.example.entities.Lot;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.UserRepository;
import iset.pfe.example.repositories.CentreCollecteRepository;
import iset.pfe.example.repositories.LotRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.OperationTankRepository;
import iset.pfe.example.repositories.TankRepository;

@SpringBootApplication
public class PfeBackEndApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TankRepository tankRepository;
	@Autowired
	private OperationTankRepository operationTankRepository;
	@Autowired
	private OperationRepository operationRepository;
	
	@Autowired
	private LotRepository lotRepository;
	
	@Autowired
	private CentreCollecteRepository centreCollecteRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		Date dateA=new Date("22/03/2021");
		Date dateE=new Date("22/04/2021");
		
		User u1=new User("nour", "guerfali", 11331133, 54546450, "nour", "nour");
		userRepository.save(u1);
		
		User u2=new User("ahmed", "ben saber", 11221122, 54685999, "ahmed", "ahmed");
		userRepository.save(u1);
		
		Tank t1=new Tank("1252sdsg58", 120, 0, "Vide");
		tankRepository.save(t1);
		
		Lot l1=new Lot("Yaourt", "Yaourttttt ", dateA.toString());
		lotRepository.save(l1);
		
		CentreCollecte c1=new CentreCollecte("centre 1", "Bizerte", "Bizerte");
		centreCollecteRepository.save(c1);
		
		
	}

}
