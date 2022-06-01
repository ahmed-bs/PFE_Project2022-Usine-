package iset.pfe.example;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import iset.pfe.example.entities.User;
import iset.pfe.example.entities.CentreCollecte;
import iset.pfe.example.entities.Magasin;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Role;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.UserRepository;
import iset.pfe.example.repositories.CentreCollecteRepository;
import iset.pfe.example.repositories.MagasinRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.OperationTankRepository;
import iset.pfe.example.repositories.ProduitRepository;
import iset.pfe.example.repositories.RoleRepository;
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
	private RoleRepository roleRepository;
	
	
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
		
	
		
		User u2=new User("ahmed", "ben saber", 11221122, 54685999, "ahmed", "ahmed");
		userRepository.save(u2);
		
		Tank t1=new Tank("tank numero 1", 120, 0, "Vide");
		tankRepository.save(t1);
		
		Tank t2=new Tank("tank numero 2", 120, 0, "Vide");
		tankRepository.save(t2);
		
		Tank t3=new Tank("tank numero 3", 120, 0, "Vide");
		tankRepository.save(t3);
		
		Magasin m1=new Magasin("Magasin général", "manzel abderahmen", "Bizerte");
		m1.setTel(72545545);
		magasinRepository.save(m1);
		
		Magasin m2=new Magasin("Magasin général", "Ariana", "Tunis");
		m2.setTel(72545545);
		magasinRepository.save(m2);
		
		Magasin m3=new Magasin("Magasin général", "El manar", "Tunis");
		m3.setTel(72545545);
		magasinRepository.save(m3);
		
		Magasin m4=new Magasin("Magasin général", "Ennasr", "Tunis");
		m4.setTel(72545545);
		magasinRepository.save(m4);
		
		Magasin m5=new Magasin("Magasin AZIZA", "Ain mariem", "Bizerte");
		m5.setTel(72545545);
		magasinRepository.save(m5);
		
		Magasin m6=new Magasin("Magasin AZIZA", "Route corniche", "Bizerte");
		m6.setTel(72545545);
		magasinRepository.save(m6);
		
		Magasin m7=new Magasin("Magasin AZIZA", "Cité el nakhla", "Tunis");
		m7.setTel(72545545);
		magasinRepository.save(m7);
		
		CentreCollecte c1=new CentreCollecte("SMBSA Ennajeh", "Beni Kheddache", "Madanin");
		c1.setTel(22554425);
		centreCollecteRepository.save(c1);
		
		CentreCollecte c2=new CentreCollecte("SMBSA Ettaoufik", "Morneg", "Ben arous");
		c2.setTel(72899899);
		centreCollecteRepository.save(c2);
		
		CentreCollecte c3=new CentreCollecte("SMBSA Ettajdid", "Sousse", "Sousse");
		c3.setTel(72455541);
		centreCollecteRepository.save(c3);
		
		CentreCollecte c4=new CentreCollecte("SSA Nour", "Eddaly-Utique", "Bizerte");
		c4.setTel(72991552);
		centreCollecteRepository.save(c4);
		


		Produit p1=new Produit("yaourt - fraise", "akf5rfvn54");
		produitRepository.save(p1);
		
		Produit p2=new Produit("yaourt - vanille", "xs4df5s4s");
		produitRepository.save(p2);
		
		Produit p3=new Produit("yaourt - noix de coco", "s5dz2a5d1e");
		produitRepository.save(p3);
		
		Produit p4=new Produit("yaourt - citron", "xs5zd5z265");
		produitRepository.save(p4);
		
		Produit p5=new Produit("yaourt - péche", "x5sd2d5dd");
		produitRepository.save(p5);
		
		Produit p6=new Produit("Lait demi-écrémé", "dcs85d1d4");
		produitRepository.save(p6);
		
		Produit p7=new Produit("Lait entier", "5f1z5aj5r");
		produitRepository.save(p7);
		
		Produit p8=new Produit("Lait ecrémé", "k65lo2ga58");
		produitRepository.save(p8);
		
		
		Role role1=new Role("USER");
		roleRepository.save(role1);
		
		
		
		BCryptPasswordEncoder encoder; 
		encoder = new BCryptPasswordEncoder();
		
		User ch1=new User();
		ch1.setUsername("nour");
		ch1.setPrenom("Nour");
		ch1.setPassword(encoder.encode("nour"));
		ch1.setNom("Guerfali");
		ch1.setCin(11431134);
		ch1.setTel(54546450);
		ch1.getRoles().add(role1);
		userRepository.save(ch1);

//		Lot l1=new Lot(dateA.toString());
//		l1.setQteLot(1755);
//		l1.setQtePriseTank(1000);
//		l1.setProduit(p1);
//		l1.setTank(t2);
//		lotRepository.save(l1);
	}

}
