package iset.pfe.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import iset.pfe.example.entities.User;
import iset.pfe.example.entities.CentreCollecte;
import iset.pfe.example.entities.Lot;
import iset.pfe.example.entities.Magasin;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.UserRepository;
import iset.pfe.example.repositories.CentreCollecteRepository;
import iset.pfe.example.repositories.LotRepository;
import iset.pfe.example.repositories.MagasinRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.OperationTankRepository;
import iset.pfe.example.repositories.ProduitRepository;
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
	
	@Autowired
	private ProduitRepository produitRepository;
	
	@Autowired
	private MagasinRepository magasinRepository;
	
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
		userRepository.save(u2);
		
		Tank t1=new Tank("tank numero 1", 120, 0, "Vide");
		tankRepository.save(t1);
		
		Tank t2=new Tank("tank numero 2", 120, 0, "Vide");
		tankRepository.save(t2);
		
		
		Magasin m1=new Magasin("magasin numero 1", "manzel abderahmen", "Bizerte");
		magasinRepository.save(m1);
		
		CentreCollecte c1=new CentreCollecte("centre 1", "Bizerte", "Bizerte");
		centreCollecteRepository.save(c1);
		
		Operation o1=new Operation(120, dateA.toLocaleString(), "Remplissage", 112200);
		o1.setCentreCollecte(c1);
		operationRepository.save(o1);


		Produit p1=new Produit("yaourt - fraise", "akf5rfvn54");
		produitRepository.save(p1);
		

		Lot l1=new Lot(dateA.toString());
		l1.setQte(1755);
		l1.setProduit(p1);
		l1.setTank(t2);
		lotRepository.save(l1);
	}

}
