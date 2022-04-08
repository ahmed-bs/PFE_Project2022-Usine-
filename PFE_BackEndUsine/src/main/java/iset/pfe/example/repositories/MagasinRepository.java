package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import iset.pfe.example.entities.Magasin;
import iset.pfe.example.entities.Operation;

public interface MagasinRepository extends JpaRepository<Magasin,Integer>{

}
