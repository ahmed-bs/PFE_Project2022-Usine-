package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.Stock;

public interface StockRepository extends JpaRepository<Stock,Integer>{

}
