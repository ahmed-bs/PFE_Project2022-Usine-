package iset.pfe.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import iset.pfe.example.entities.Lot;
import iset.pfe.example.entities.OperationTank;

public interface LotRepository extends JpaRepository<Lot,Integer>{
	@Query("select o from Lot  o where o.qteLot>0")
	public List<Lot> getLotDispo();
	
	@Transactional 
	@Modifying
	@Query("delete Lot op where op.idL=:idL")
	void deleteLot(@Param("idL") Integer idL);
	
}
