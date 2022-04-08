package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.Lot;

public interface LotRepository extends JpaRepository<Lot,Integer>{

}
