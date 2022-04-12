package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.Produit;

public interface ProduitRepository extends JpaRepository<Produit,Integer>{

}
