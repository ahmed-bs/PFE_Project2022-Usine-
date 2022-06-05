package iset.pfe.example.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import iset.pfe.example.entities.Magasin;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.OperationTank;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.MagasinRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.OperationTankRepository;
import iset.pfe.example.repositories.ProduitRepository;
import iset.pfe.example.repositories.TankRepository;
import iset.pfe.example.repositories.UserRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class OperationRestController {
	
	@Autowired
	private OperationRepository operationRepository;
	@Autowired
	private TankRepository tankRepository;
	@Autowired
	private OperationTankRepository operationTankRepository;
	@Autowired
	private MagasinRepository magasinRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProduitRepository produitRepository;
	
	@RequestMapping(value="/operations",method = RequestMethod.GET)
	public List<Operation> getOperations(){
		for(int i=0;i<tankRepository.findAll().size();i++){
			Tank t=tankRepository.findAll().get(i);
			if(t.getPoidActuel()==0) {
				t.setDateIns(null);
				tankRepository.save(t);
			}
		}
		return operationRepository.findAll();
	}
	
	@RequestMapping(value="/op/{code}",method = RequestMethod.GET)
	public int getOperationsUtilise(@PathVariable Integer code){
		int msg=0;
		for(int i=0;i<operationRepository.findAll().size();i++) {
			Operation t=operationRepository.findAll().get(i);
			if(code.equals(t.getCode())) {
				msg=1;
			}
		}
		return msg;
	}
	
	
	
	@RequestMapping(value="/nbOpRetrait",method = RequestMethod.GET)
	public int getnbOpRetrait(){
		return operationRepository.findAllOperationsRemplissages("Retrait").size();
	}
	
	@RequestMapping(value="/nbOpRemplissage",method = RequestMethod.GET)
	public int getnbOpRemplissage(){
		return operationRepository.findAllOperationsRemplissages("Remplissage").size();
	}
	
	@RequestMapping(value="/nbOpTransformation",method = RequestMethod.GET)
	public int getnbOpTransformation(){
		return operationRepository.findAllOperationsRemplissages("Transformation").size();
	}
	
		
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.GET)
	public Operation getOperation(@PathVariable Integer idOperation) {
	Optional<Operation> op = operationRepository.findById(idOperation);
		if (op.isPresent()) { 
			return op.get();
		}else throw new RuntimeException("Operation introuvable !!");
	}
	
	
	@RequestMapping(value="/getOpTank/{idOperation}",method = RequestMethod.GET)
	public List<OperationTank> getOpTank(@PathVariable Integer idOperation) {		
		return operationRepository.find(idOperation);
	}
	
	
	
	@RequestMapping(value="/find/{idOperation}",method = RequestMethod.GET)
	public List<OperationTank> fingOperation(@PathVariable Integer idOperation) {
	List<OperationTank> op = operationRepository.find(idOperation);
		return op;
	}
	
	
	
	@RequestMapping(value="/operationsTank/{idOpTank}",method = RequestMethod.GET)
	public OperationTank getOperationTank(@PathVariable Integer idOpTank) {
	OperationTank opT = operationRepository.getOperationTank(idOpTank);
		return opT;
	}
	
	
	

		
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteOperation(@PathVariable Integer idOperation) {
		Optional<Operation> op= operationRepository.findById(idOperation);
		Operation o=operationRepository.findById(idOperation).get();
		for( int i=0;i<operationRepository.find(idOperation).size();i++) {
			OperationTank opt=operationRepository.find(idOperation).get(i);
			if(idOperation==opt.getOperation().getIdOperation()) {
		
    		Tank t=tankRepository.findById(opt.getTank().getIdTank()).get();
    		System.out.println(t.getIdTank());
    		t.setPoidActuel((t.getPoidActuel()-opt.getQteInsereTank()));
    		tankRepository.save(t);
//			//o.setPoidsLait(operation.getPoidsLait());
			o.setIdOperation(idOperation);
			operationRepository.save(o);
			
			if(t.getPoidActuel()==0) {
				t.setDateIns(null);
				tankRepository.save(t);
		}
		}
		}
		
		operationRepository.deleteOpTank(idOperation);
		
		//operationRepository.deleteOp(idOperation);			
		if (op.isPresent()) { 
				operationRepository.deleteOp(idOperation);
			}else throw new RuntimeException("Operation introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
	
	@RequestMapping(value="/operationsRet/{idOperation}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteOperationRetrait(@PathVariable Integer idOperation) {
		Optional<Operation> op= operationRepository.findById(idOperation);
		Operation o=operationRepository.findById(idOperation).get();
			
			operationRepository.save(o);
    		Produit p=produitRepository.findById(o.getProduit().getIdProduit()).get();
    		System.out.println("azettyyyy "+o.getQtePrise());
    		
    		int qte=p.getQte()+o.getQtePrise();
    		System.out.println("aaaa aaa aa"+qte);
    		p.setQte(qte);
    		produitRepository.save(p);
			o.setIdOperation(idOperation);
			operationRepository.save(o);
				
		if (op.isPresent()) { 
				operationRepository.deleteOp(idOperation);
			}else throw new RuntimeException("Operation introuvable ! vous ne pouvez pas le supprimer !!");
		}
	
	
	

	@RequestMapping(value="/operationsTransf/{idOperation}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteOperationTransf(@PathVariable Integer idOperation) {
		Optional<Operation> op= operationRepository.findById(idOperation);
		Operation o=operationRepository.findById(idOperation).get();
			
//			operationRepository.save(o);
    		Produit p=produitRepository.findById(o.getProduit().getIdProduit()).get();
    		Tank t=tankRepository.findById(o.getTank().getIdTank()).get();
    		
    		System.out.println("transfffffff "+o.getQtePrise());
    		System.out.println("transfffffff "+p.getQte());
    		System.out.println("transfffffff "+o.getPoidsLait());
    		System.out.println("transfffffff "+t.getPoidActuel());
    		
    		int qte=p.getQte()-o.getQtePrise();
    		System.out.println("aaaa aaa aa"+qte);
    		p.setQte(qte);
    		produitRepository.save(p);
    		int qte1=(int) (t.getPoidActuel()+o.getPoidsLait());
    		t.setPoidActuel(qte1);
    		tankRepository.save(t);
			o.setIdOperation(idOperation);
			o.setCodeRemplissage(null);
			operationRepository.save(o);
				
		if (op.isPresent()) { 
		operationRepository.deleteOp(idOperation);
			}else throw new RuntimeException("Operation introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
		
	
	
	@RequestMapping(value="/operations",method = RequestMethod.POST)
	public Operation AddOperation(@RequestBody Operation operation){
		
	return operationRepository.save(operation);
}
	
	@RequestMapping(value="/transf",method = RequestMethod.POST)
	public Operation AddOperationTransf(@RequestBody Operation operation){
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
	     List<Integer> liste = new ArrayList<>();
	     int qte=0;
	     Tank t=tankRepository.findById(operation.getTank().getIdTank()).get();
	     qte=(int) (t.getPoidActuel()-operation.getPoidsLait());
	     t.setPoidActuel(qte);
	     tankRepository.save(t);
	    
	     Produit p=produitRepository.findById(operation.getProduit().getIdProduit()).get();
	     int qte1=p.getQte()+operation.getQtePrise();
	     p.setQte(qte1);
	     produitRepository.save(p);
	     
//	     if(t.getPoidActuel()==0) {
//				t.setCodeTank(null);
//			    tankRepository.save(t);
//		}
	     
	 	for(int i=0;i<tankRepository.findAll().size();i++) {
			
			Tank tank2=tankRepository.findAll().get(i);
			
			if(tank2.getPoidActuel()==tank2.getPoidVide()) {
			tank2.setEtat("Remplis");
			tankRepository.save(tank2);
			}
			else if(tank2.getPoidActuel()==0) {
				tank2.setEtat("Vide");
				tank2.setDateIns(null);
				tankRepository.save(tank2);
				}
			else if(tank2.getPoidActuel()<tank2.getPoidVide()) {
				tank2.setEtat("En cours");
				tankRepository.save(tank2);
				}
		}
		for(int i=0;i<tankRepository.findAll().size();i++) {
			Tank tank2=tankRepository.findAll().get(i);
//			List<Integer> liste=new ArrayList<>();
			if(tank2.getPoidActuel()==0) {
				for(int j=0;j<tank2.getCodeTank().size();j++) {

					if(liste.contains(tank2.getCodeTank().get(j))) {
			            
					}
				else {
					liste.add(tank2.getCodeTank().get(j));
				}
					
				}
				tank2.setCodeTank(null);
					tankRepository.save(tank2);
			}
		}
		for(int i=0;i<tankRepository.findAll().size();i++) {
			
			Tank tank2=tankRepository.findAll().get(i);
			if(tank2.getPoidActuel()>0) {
				for(int j=0;j<tank2.getCodeTank().size();j++) {

					if(liste.contains(tank2.getCodeTank().get(j))) {
			            
					}
				else {
					liste.add(tank2.getCodeTank().get(j));
				}
					
				}
			System.out.println("ye <3 <3 <3 <3 <3 <3 <3 <3 <3 ===> "+operation.getCodeRemplissage());
		}
		}
		operation.setCodeRemplissage(liste);
		operation.setDateOperation(currentDateTime);
		//operation.setCode(1000000+operationRepository.findAll());
		operation.setTypeOp("Transformation");			

	return operationRepository.save(operation);
}
	
	
	@RequestMapping(value="/retrait1",method = RequestMethod.POST)
	public Operation AddOperationRetrait1(@RequestBody Operation operation){
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
	     int qte=0;
	     Produit p=produitRepository.findById(operation.getProduit().getIdProduit()).get();
	     int qte1=p.getQte()-operation.getQtePrise();
	     p.setQte(qte1);
	     produitRepository.save(p);

		operation.setDateOperation(currentDateTime);
		operation.setTypeOp("Retrait");			

	return operationRepository.save(operation);
}


	
	@RequestMapping(value="/remplissage",method = RequestMethod.POST)
	public Operation AddOperationRemplissage(@RequestBody Operation operation){
	
	
		for(int i=0;i<operationTankRepository.findAll().size();i++) {
			OperationTank opt=operationTankRepository.findAll().get(i);
			if(opt.getQteInsereTank()==0) {
				operationTankRepository.delete(opt);
				System.out.println("#############################################################");
			}
		}
		
		
		//la quantite generale de lait inserée dans les tanks :
		double qteGeneraleLait=0;
		double diff=0;
		for(int i=0;i<tankRepository.findAll().size();i++) 
		{   Tank tank2=tankRepository.findAll().get(i);
			qteGeneraleLait=qteGeneraleLait+tank2.getPoidActuel();
		}   System.out.println("######"+qteGeneraleLait);


		//la quantite libre de lait :
		double qte=0;
		double qteLibreLait=0;
		for(int j=0;j<tankRepository.findAll().size();j++) 
		{
			Tank tank3=tankRepository.findAll().get(j);
			qte=qte+tank3.getPoidVide();
			
		}
		qteLibreLait=qte-qteGeneraleLait;
		System.out.println("######"+qteLibreLait);
		
		double s=0;
		double a=operation.getPoidsLait();
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
	     System.out.println(currentDateTime);

			if(a>qteLibreLait) {
		System.out.println("erreur! Vous ne pouvez pas inserer cette quantite dans les tanks ,car la quantite disponible que tu peut l'inserer est :"+qteLibreLait);
		}
			else {
				
				Date date1=new Date();
				operation.setDateOperation(currentDateTime);
				operation.setTypeOp("Remplissage");
			
				operationRepository.save(operation);
			
			for(int j=0;j<tankRepository.findAll().size();j++){
				Tank tank=tankRepository.findAll().get(j);
//				 String dateP=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
//				 String dateP2=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
				s=tank.getPoidVide()-tank.getPoidActuel();
//			if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0  && a>tank.getPoidVide()  ) {
//				diff=tank.getPoidVide()-tank.getPoidActuel();
//				tank.setPoidActuel(tank.getPoidVide());
//				tank.setDateIns(currentDateTime);
//				a=a-s;
//				//tank.getOperations().add(operation);
//				tankRepository.save(tank);
//				OperationTank opt=new OperationTank(currentDateTime);
//				opt.setOperation(operation);
//				opt.setTank(tank);
//				opt.setQteInsereTank(diff);
//				operationTankRepository.save(opt);
		//	
//				//operation.getTanks().add(tank);
//				
//				//operationRepository.save(operation);
//			}
			
			}
			
			
			//zetha le 27-05-2022
			
			
			for(int j=0;j<tankRepository.findAll().size();j++){
				Tank tank=tankRepository.findAll().get(j);
				
				s=tank.getPoidVide()-tank.getPoidActuel();
			if(tank.getPoidActuel()==0 && tank.getPoidActuel()<tank.getPoidVide() && a>0  && a>=(tank.getPoidVide()-tank.getPoidActuel()) && tank.getDateIns()!=null   ) {
				 String dateP=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
				 String dateP2=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
			 if(  Integer.parseInt(dateP2)==Integer.parseInt(dateP)) {
				diff=tank.getPoidVide()-tank.getPoidActuel();
				
				tank.setPoidActuel(diff);
				tank.setDateIns(currentDateTime);
				tank.getCodeTank().add(operation.getCode());
				a=a-diff;
				tankRepository.save(tank);
				
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(diff);
//				opt.setCodeLiaison(operation.getCode());
				operationTankRepository.save(opt);
			
				System.out.println("id tank : "+tank.getIdTank());
				System.out.println(" a1111="+a);	
				
				//operation.getTanks().add(tank);
				
				//operationRepository.save(operation);
			}
			}
			

			if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0  && a>=(tank.getPoidVide()-tank.getPoidActuel()) && tank.getDateIns()!=null   ) {
				 String dateP=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
				 String dateP2=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
			 if(  Integer.parseInt(dateP2)==Integer.parseInt(dateP)) {
				diff=tank.getPoidVide()-tank.getPoidActuel();
				
				tank.setPoidActuel(tank.getPoidActuel()+diff);
				tank.setDateIns(currentDateTime);
				tank.getCodeTank().add(operation.getCode());
				a=a-diff;
				tankRepository.save(tank);
				
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(diff);
//				opt.setCodeLiaison(operation.getCode());
				operationTankRepository.save(opt);
			
				System.out.println("id tank : "+tank.getIdTank());
				System.out.println(" a1111="+a);	
				
				//operation.getTanks().add(tank);
				
				//operationRepository.save(operation);
			}
			}
			}
			
			
			for(int j=0;j<tankRepository.findAll().size();j++){
				Tank tank=tankRepository.findAll().get(j);
				
				s=tank.getPoidVide()-tank.getPoidActuel();
			if(tank.getPoidActuel()==0 && tank.getPoidActuel()<tank.getPoidVide() && a>0  && a>=(tank.getPoidVide()-tank.getPoidActuel()) && tank.getDateIns()==null   ) {
				 
				diff=tank.getPoidVide()-tank.getPoidActuel();
				
				tank.setPoidActuel(diff);
				tank.setDateIns(currentDateTime);
				tank.getCodeTank().add(operation.getCode());
				a=a-diff;
				tankRepository.save(tank);
				
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(diff);
//				opt.setCodeLiaison(operation.getCode());
				operationTankRepository.save(opt);
			
				System.out.println("id tank : "+tank.getIdTank());
				System.out.println(" a1111="+a);	
				
				//operation.getTanks().add(tank);
				
				//operationRepository.save(operation);
			}
			if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0  && a>=(tank.getPoidVide()-tank.getPoidActuel()) && tank.getDateIns()==null   ) {
				 
				diff=tank.getPoidVide()-tank.getPoidActuel();
				
				tank.setPoidActuel(tank.getPoidActuel()+diff);
				tank.setDateIns(currentDateTime);
				tank.getCodeTank().add(operation.getCode());
				a=a-diff;
				tankRepository.save(tank);
				
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(diff);
//				opt.setCodeLiaison(operation.getCode());
				operationTankRepository.save(opt);
			
				System.out.println("id tank : "+tank.getIdTank());
				System.out.println(" a1111="+a);	
				
				//operation.getTanks().add(tank);
				
				//operationRepository.save(operation);
			}
			}
			
			
			
			

			for(int j=0;j<tankRepository.findAll().size();j++){
				Tank tank=tankRepository.findAll().get(j);
				
				s=tank.getPoidVide()-tank.getPoidActuel();
			if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0  && a>tank.getPoidVide() && tank.getDateIns()!=null   ) {
				 String dateP=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
				 String dateP2=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
			 if(  Integer.parseInt(dateP2)==Integer.parseInt(dateP)) {
				diff=tank.getPoidVide()-tank.getPoidActuel();
				
				tank.setPoidActuel(tank.getPoidVide());
				tank.setDateIns(currentDateTime);
				tank.getCodeTank().add(operation.getCode());
				a=a-s;
				tankRepository.save(tank);
				
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(diff);
//				opt.setCodeLiaison(operation.getCode());
				operationTankRepository.save(opt);
			
				System.out.println("id tank : "+tank.getIdTank());
				System.out.println(" a1="+a);	
				
				//operation.getTanks().add(tank);
				
				//operationRepository.save(operation);
			}
			}
			
			
			
			if(a>0 && a<=(tank.getPoidVide()-tank.getPoidActuel()) && tank.getDateIns()!=null) {
				 String dateP=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
				 String dateP2=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
			 if(  Integer.parseInt(dateP2)==Integer.parseInt(dateP)) {
				 
			 
				tank.setPoidActuel(tank.getPoidActuel()+a);
				tank.setDateIns(currentDateTime);
				tank.getCodeTank().add(operation.getCode());
				System.out.println("id tank : "+tank.getIdTank());
				System.out.println(" a2="+a);
				tankRepository.save(tank);
				
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(a);
//				opt.setCodeLiaison(operation.getCode());
				operationTankRepository.save(opt);
				a=0;
				
			}
			}
			}
			
			

			for(int j=0;j<tankRepository.findAll().size();j++){
				Tank tank=tankRepository.findAll().get(j);
				
				s=tank.getPoidVide()-tank.getPoidActuel();
			if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0  && a>tank.getPoidVide() && tank.getDateIns()==null   ) {
				
				diff=tank.getPoidVide()-tank.getPoidActuel();
				
				tank.setPoidActuel(tank.getPoidVide());
				tank.setDateIns(currentDateTime);
				System.out.println("id tank : "+tank.getIdTank());
				System.out.println(" a3="+a);	
				a=a-s;
				tank.getCodeTank().add(operation.getCode());
				tankRepository.save(tank);
				
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(diff);
//				opt.setCodeLiaison(operation.getCode());
				operationTankRepository.save(opt);
			
				//operation.getTanks().add(tank);
				
				//operationRepository.save(operation);
			}
			
			
//			if(tank.getPoidActuel()>0 && a<tank.getPoidVide() && a>0  && tank.getPoidVide()-tank.getPoidActuel()<a) {
//				diff=tank.getPoidVide()-tank.getPoidActuel();
//				
//				tank.setPoidActuel(tank.getPoidVide());
//				tank.setDateIns(currentDateTime);
//				System.out.println("id tank : "+tank.getIdTank());
//				System.out.println(" a4="+a);	
//				a=a-s;
//				tank.getCodeTank().add(operation.getCode());
//				tankRepository.save(tank);
//				
//				OperationTank opt=new OperationTank(currentDateTime);
//				opt.setOperation(operation);
//				opt.setTank(tank);
//				opt.setQteInsereTank(diff);
//				opt.setCodeLiaison(operation.getCode());
//				operationTankRepository.save(opt);
//				
//				
//				
//			}
			}
			
				System.out.println("hahahaha : "+a);

					for(int i=0;i<tankRepository.findAll().size();i++) {
						Tank tank1=tankRepository.findAll().get(i);
						if(tank1.getPoidActuel()==0 && a>tank1.getPoidVide()) {
							diff=tank1.getPoidVide()-tank1.getPoidActuel();
							tank1.setPoidActuel(tank1.getPoidVide()-tank1.getPoidActuel());
							tank1.setDateIns(currentDateTime);
							tank1.getCodeTank().add(operation.getCode());
							tankRepository.save(tank1);
							OperationTank opt=new OperationTank(currentDateTime);
							opt.setOperation(operation);
							opt.setTank(tank1);
							opt.setQteInsereTank(diff);
//							opt.setCodeLiaison(operation.getCode());
							operationTankRepository.save(opt);
							a=a-tank1.getPoidVide();
							System.out.println("id tank : "+tank1.getIdTank());
							System.out.println(" a5="+a);	
						}
					}
						
						
						for(int i=0;i<tankRepository.findAll().size();i++) {
							Tank tank1=tankRepository.findAll().get(i);
						if(tank1.getPoidActuel()==0 && a<=tank1.getPoidVide() && a>0) {
							
							tank1.setPoidActuel(a);
							tank1.setDateIns(currentDateTime);
							tank1.getCodeTank().add(operation.getCode());
							tankRepository.save(tank1);
							
							OperationTank opt=new OperationTank(currentDateTime);
							opt.setOperation(operation);
							opt.setTank(tank1);
							opt.setQteInsereTank(a);
//							opt.setCodeLiaison(operation.getCode());
							operationTankRepository.save(opt);
							System.out.println("id tank : "+tank1.getIdTank());
							System.out.println(" a6="+a);	
							a=0;
							
						}
						}
						
					
					
					
					for(int i=0;i<tankRepository.findAll().size();i++) {
						Tank tank1=tankRepository.findAll().get(i);
						if(tank1.getPoidActuel()==0 && a>=tank1.getPoidVide() && tank1.getDateIns()==null) {
							diff=tank1.getPoidVide()-tank1.getPoidActuel();
							tank1.setPoidActuel(tank1.getPoidVide()-tank1.getPoidActuel());
							tank1.setDateIns(currentDateTime);
							tank1.getCodeTank().add(operation.getCode());
							tankRepository.save(tank1);
						
							OperationTank opt=new OperationTank(currentDateTime);
							opt.setOperation(operation);
							opt.setTank(tank1);
							opt.setQteInsereTank(diff);
//							opt.setCodeLiaison(operation.getCode());
							operationTankRepository.save(opt);
							System.out.println("id tank : "+tank1.getIdTank());
							System.out.println(" a7-1="+a);	
							a=a-tank1.getPoidVide();
							System.out.println("id tank : "+tank1.getIdTank());
							System.out.println(" a7="+a);	
						}
						
						
//						if(tank1.getPoidActuel()==0 && a<100 && a>0  && tank1.getDateIns()==null) {
//							tank1.setPoidActuel(a);
//							tank1.setDateIns(currentDateTime);
//							tankRepository.save(tank1);
//							
//							OperationTank opt=new OperationTank(currentDateTime);
//							opt.setOperation(operation);
//							opt.setTank(tank1);
//							opt.setQteInsereTank(a);
//							opt.setCodeLiaison(operation.getCode());
//							operationTankRepository.save(opt);
//							System.out.println("id tank : "+tank1.getIdTank());
//							System.out.println(" a8-1="+a);	
//							a=0;
//							System.out.println("id tank : "+tank1.getIdTank());
//							System.out.println(" a8="+a);	
//							
//						}
//						
						
						
					}
					
					
					
					for(int i=0;i<tankRepository.findAll().size();i++) {
								
								Tank tank2=tankRepository.findAll().get(i);
								
								if(tank2.getPoidActuel()==tank2.getPoidVide()) {
								tank2.setEtat("Remplis");
								tankRepository.save(tank2);
							
								}
								else if(tank2.getPoidActuel()==0) {
									tank2.setEtat("Vide");
									tank2.setDateIns(null);
									tankRepository.save(tank2);
									
									}
								else if(tank2.getPoidActuel()<tank2.getPoidVide()) {
									tank2.setEtat("En cours");
									tankRepository.save(tank2);
									}
							}
			}
				
				for(int i=0;i<operationTankRepository.findAll().size();i++) {
					OperationTank opt=operationTankRepository.findAll().get(i);
					if(opt.getQteInsereTank()==0) {
						operationTankRepository.deleteOpTanks();
						System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
					}
				}
				
				
			operation.setCode(operation.getCode());
			operationRepository.save(operation);
			
//			List o=new ArrayList<>();
//			o.add(0, 10002);
//			
//			System.out.println("########## 1");
//			System.out.println(tankRepository.findAll().get(0).getCodeTank());
//			System.out.println("########## 2");
//			System.out.println(tankRepository.findAll().get(0).getCodeTank().get(0));
//			System.out.println("########## 3");
//			System.out.println(tankRepository.findAll().get(0).getCodeTank().listIterator().toString());
//			System.out.println("########## 4");
//			System.out.println(tankRepository.findAll().get(0).getCodeTank().contains(o));
//			System.out.println("########## 4");
//			System.out.println(tankRepository.findAll().get(0).getCodeTank().contains(10002));
//			
//			System.out.println("########## 5");
			List lista=new ArrayList<>();
			for(int k=0;k<tankRepository.findAll().size();k++) {
			lista.add(tankRepository.findAll().get(k).getCodeTank());
			}
//			
//			System.out.println(lista.toString());
//			
//			System.out.println("***********************************************************************");
//			
				return operation;
			}
	
	
	
	
	@RequestMapping(value="/retrait",method = RequestMethod.POST)
	public Operation AddOperationRetrait(@RequestBody Operation operation){
	    double s=0;
		double a=operation.getPoidsLait();
		double p=0;
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
	     System.out.println(currentDateTime);
	Date date1=new Date();
	operation.setDateOperation(currentDateTime);
	operation.setTypeOp("Retrait");
	operation.setUser(userRepository.findAll().get(0));
	int b=operationRepository.findAll().size();
	//operation.setCode(10000+b);
	operationRepository.save(operation);
	
	// nverifi 3la date idha 3andha date a9al heya eli nlivriha lowla 
	
		for(int j=0;j<tankRepository.findAll().size();j++){
			Tank tank=tankRepository.findAll().get(j);
			s=tank.getPoidVide()-tank.getPoidActuel();
			
			if(tank.getDateIns()!=null) {
			
			 String date11=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
			 String date22=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
			 
			 String date12=currentDateTime.charAt(5)+""+currentDateTime.charAt(6);
			 String date13=tank.getDateIns().charAt(5)+""+tank.getDateIns().charAt(6);
			 
			 String date14=currentDateTime.charAt(0)+""+currentDateTime.charAt(1)+""+currentDateTime.charAt(2)+""+currentDateTime.charAt(3);
			 String date15=tank.getDateIns().charAt(0)+""+tank.getDateIns().charAt(1)+""+tank.getDateIns().charAt(2)+""+tank.getDateIns().charAt(3);
			 
			if(tank.getPoidActuel()>0 && a>0 && tank.getPoidActuel()<tank.getPoidVide() && a<tank.getPoidVide()  && a<=tank.getPoidActuel() &&
					Integer.parseInt(date22)<Integer.parseInt(date11)) {
				p=tank.getPoidActuel()-a;
				
				tank.setPoidActuel(p);
				tankRepository.save(tank);
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(a*-1);
				operationTankRepository.save(opt);
				a=0;
				//operation.getTanks().add(tank);
			}
			
			else if(tank.getPoidActuel()>0 && a>0 && tank.getPoidActuel()<tank.getPoidVide() && a<tank.getPoidVide()  && a<=tank.getPoidActuel() &&
					Integer.parseInt(date13)<Integer.parseInt(date12)) {
				p=tank.getPoidActuel()-a;
				
				tank.setPoidActuel(p);
				tankRepository.save(tank);
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(a*-1);
				operationTankRepository.save(opt);
				a=0;
				//operation.getTanks().add(tank);
			}
			
		}	
	}
		
		
		
		//Verif 3la date 9bal kima eli l fou9
		
		for(int j=0;j<tankRepository.findAll().size();j++){
			Tank tank=tankRepository.findAll().get(j);
			s=tank.getPoidVide()-tank.getPoidActuel();
			if(tank.getDateIns()!=null) {
				
				 String date11=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
				 String date22=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
				 
				 String date12=currentDateTime.charAt(5)+""+currentDateTime.charAt(6);
				 String date13=tank.getDateIns().charAt(5)+""+tank.getDateIns().charAt(6);
				 
				 String date14=currentDateTime.charAt(0)+""+currentDateTime.charAt(1)+""+currentDateTime.charAt(2)+""+currentDateTime.charAt(3);
				 String date15=tank.getDateIns().charAt(0)+""+tank.getDateIns().charAt(1)+""+tank.getDateIns().charAt(2)+""+tank.getDateIns().charAt(3);
				 
			if(a>0 && tank.getPoidActuel()==tank.getPoidVide() && a==tank.getPoidActuel() && 
					Integer.parseInt(date22)<Integer.parseInt(date11)) {
				
				p=tank.getPoidActuel()-a;
				
				tank.setPoidActuel(p);
				tankRepository.save(tank);
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(a*-1);
				operationTankRepository.save(opt);
				a=0;
				//operation.getTanks().add(tank);
			}
			
			else if(a>0 && tank.getPoidActuel()==tank.getPoidVide() && a==tank.getPoidActuel() && 
					Integer.parseInt(date13)<Integer.parseInt(date12)) {
				
				p=tank.getPoidActuel()-a;
				
				tank.setPoidActuel(p);
				tankRepository.save(tank);
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank);
				opt.setQteInsereTank(a*-1);
				operationTankRepository.save(opt);
				a=0;
				//operation.getTanks().add(tank);
			}
		}
	}
	
		//Verif 3la date 
		
		for(int j=0;j<tankRepository.findAll().size();j++){
			Tank tank=tankRepository.findAll().get(j);
			s=tank.getPoidVide()-tank.getPoidActuel();

			if(tank.getDateIns()!=null) {
			 String date11=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
			 String date22=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
			 
			 String date12=currentDateTime.charAt(5)+""+currentDateTime.charAt(6);
			 String date13=tank.getDateIns().charAt(5)+""+tank.getDateIns().charAt(6);
			 
			 String date14=currentDateTime.charAt(0)+""+currentDateTime.charAt(1)+""+currentDateTime.charAt(2)+""+currentDateTime.charAt(3);
			 String date15=tank.getDateIns().charAt(0)+""+tank.getDateIns().charAt(1)+""+tank.getDateIns().charAt(2)+""+tank.getDateIns().charAt(3);
			
		if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0 && a>=tank.getPoidVide() && 
				Integer.parseInt(date22)<Integer.parseInt(date11)) {
			p=tank.getPoidActuel();
			a=a-tank.getPoidActuel();
			tank.setPoidActuel(0);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(p*-1);
			operationTankRepository.save(opt);
			//operation.getTanks().add(tank);
		}
		
		else if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0 && a>=tank.getPoidVide() && 
				Integer.parseInt(date13)<Integer.parseInt(date12)) {
			p=tank.getPoidActuel();
			a=a-tank.getPoidActuel();
			tank.setPoidActuel(0);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(p*-1);
			operationTankRepository.save(opt);
			//operation.getTanks().add(tank);
		}
		}
	}
		
		
		//verif 3la date
		
				for(int i=0;i<tankRepository.findAll().size();i++) {
					Tank tank1=tankRepository.findAll().get(i);
					if(tank1.getDateIns()!=null) {
					
					 String date11=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
					 String date22=tank1.getDateIns().charAt(8)+""+tank1.getDateIns().charAt(9);
					 
					 String date12=currentDateTime.charAt(5)+""+currentDateTime.charAt(6);
					 String date13=tank1.getDateIns().charAt(5)+""+tank1.getDateIns().charAt(6);
					 
					 String date14=currentDateTime.charAt(0)+""+currentDateTime.charAt(1)+""+currentDateTime.charAt(2)+""+currentDateTime.charAt(3);
					 String date15=tank1.getDateIns().charAt(0)+""+tank1.getDateIns().charAt(1)+""+tank1.getDateIns().charAt(2)+""+tank1.getDateIns().charAt(3);
					
					if(tank1.getPoidActuel()==tank1.getPoidVide() && a>=tank1.getPoidVide() && a>0 && 
							Integer.parseInt(date22)<Integer.parseInt(date11)) {
						p=tank1.getPoidActuel();
						tank1.setPoidActuel(tank1.getPoidVide()-tank1.getPoidActuel());
						tankRepository.save(tank1);
						//operation.getTanks().add(tank1);
						OperationTank opt=new OperationTank(currentDateTime);
						opt.setOperation(operation);
						opt.setTank(tank1);
						opt.setQteInsereTank(p*-1);
						operationTankRepository.save(opt);
						a=a-tank1.getPoidVide();
						System.out.println("id tank : "+tank1.getIdTank());
						System.out.println(" a="+a);	
					}
					
					else if(tank1.getPoidActuel()==tank1.getPoidVide() && a>=tank1.getPoidVide() && a>0 && 
							Integer.parseInt(date13)<Integer.parseInt(date12)) {
						p=tank1.getPoidActuel();
						tank1.setPoidActuel(tank1.getPoidVide()-tank1.getPoidActuel());
						tankRepository.save(tank1);
						//operation.getTanks().add(tank1);
						OperationTank opt=new OperationTank(currentDateTime);
						opt.setOperation(operation);
						opt.setTank(tank1);
						opt.setQteInsereTank(p*-1);
						operationTankRepository.save(opt);
						a=a-tank1.getPoidVide();
						System.out.println("id tank : "+tank1.getIdTank());
						System.out.println(" a="+a);	
					}
					
					
					if(tank1.getPoidActuel()==tank1.getPoidVide() && a<tank1.getPoidVide() && a>0 && 
							Integer.parseInt(date22)<Integer.parseInt(date11)) {
						
						tank1.setPoidActuel(tank1.getPoidActuel()-a);
						tankRepository.save(tank1);
						//operation.getTanks().add(tank1);
						OperationTank opt=new OperationTank(currentDateTime);
						opt.setOperation(operation);
						opt.setTank(tank1);
						opt.setQteInsereTank(a*-1);
						operationTankRepository.save(opt);
						
						a=0;
						System.out.println("id tank : "+tank1.getIdTank());
						System.out.println(" a="+a);	
						
					}
					
					else if(tank1.getPoidActuel()==tank1.getPoidVide() && a<tank1.getPoidVide() && a>0 && 
							Integer.parseInt(date13)<Integer.parseInt(date12)) {
						
						tank1.setPoidActuel(tank1.getPoidActuel()-a);
						tankRepository.save(tank1);
						//operation.getTanks().add(tank1);
						OperationTank opt=new OperationTank(currentDateTime);
						opt.setOperation(operation);
						opt.setTank(tank1);
						opt.setQteInsereTank(a*-1);
						operationTankRepository.save(opt);
						
						a=0;
						System.out.println("id tank : "+tank1.getIdTank());
						System.out.println(" a="+a);	
						
					}
				}
					
			}
				
	
	
	
	for(int j=0;j<tankRepository.findAll().size();j++){
		Tank tank=tankRepository.findAll().get(j);
		s=tank.getPoidVide()-tank.getPoidActuel();
		
		
		if(tank.getDateIns()!=null) {
			
			 String date11=currentDateTime.charAt(8)+""+currentDateTime.charAt(9);
			 String date22=tank.getDateIns().charAt(8)+""+tank.getDateIns().charAt(9);
			 
			 String date12=currentDateTime.charAt(5)+""+currentDateTime.charAt(6);
			 String date13=tank.getDateIns().charAt(5)+""+tank.getDateIns().charAt(6);
			 
			 String date14=currentDateTime.charAt(0)+""+currentDateTime.charAt(1)+""+currentDateTime.charAt(2)+""+currentDateTime.charAt(3);
			 String date15=tank.getDateIns().charAt(0)+""+tank.getDateIns().charAt(1)+""+tank.getDateIns().charAt(2)+""+tank.getDateIns().charAt(3);
			 
			 if(tank.getPoidActuel()>0 && a>0 && tank.getPoidActuel()<tank.getPoidVide() && a<tank.getPoidVide()  && a<=tank.getPoidActuel() && 
				Integer.parseInt(date22)<Integer.parseInt(date11)&&
				Integer.parseInt(date13)<Integer.parseInt(date12)&& 
				Integer.parseInt(date15)<Integer.parseInt(date14)) {
			
			p=tank.getPoidActuel()-a;
			
			tank.setPoidActuel(p);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(a*-1);
			operationTankRepository.save(opt);
			a=0;
			//operation.getTanks().add(tank);
		}
	}
		
		
		
		if(tank.getPoidActuel()>0 && a>0 && tank.getPoidActuel()<tank.getPoidVide() && a<tank.getPoidVide()  && a<=tank.getPoidActuel()) {
			p=tank.getPoidActuel()-a;
			
			tank.setPoidActuel(p);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(a*-1);
			operationTankRepository.save(opt);
			a=0;
			//operation.getTanks().add(tank);
		}
		
	}	
	
	
	for(int j=0;j<tankRepository.findAll().size();j++){
		Tank tank=tankRepository.findAll().get(j);
		s=tank.getPoidVide()-tank.getPoidActuel();
		
		
		if(a>0 && tank.getPoidActuel()==tank.getPoidVide() && a==tank.getPoidActuel()) {
			p=tank.getPoidActuel()-a;
			
			tank.setPoidActuel(p);
			tankRepository.save(tank);
			OperationTank opt=new OperationTank(currentDateTime);
			opt.setOperation(operation);
			opt.setTank(tank);
			opt.setQteInsereTank(a*-1);
			operationTankRepository.save(opt);
			a=0;
			//operation.getTanks().add(tank);
		}
		
	}
	
	

	
	
	
	for(int j=0;j<tankRepository.findAll().size();j++){
		Tank tank=tankRepository.findAll().get(j);
		s=tank.getPoidVide()-tank.getPoidActuel();
		
	if(tank.getPoidActuel()>0 && tank.getPoidActuel()<tank.getPoidVide() && a>0 && a>=tank.getPoidVide() ) {
		p=tank.getPoidActuel();
		a=a-tank.getPoidActuel();
		tank.setPoidActuel(0);
		tankRepository.save(tank);
		OperationTank opt=new OperationTank(currentDateTime);
		opt.setOperation(operation);
		opt.setTank(tank);
		opt.setQteInsereTank(p*-1);
		operationTankRepository.save(opt);
		//operation.getTanks().add(tank);
	}
	}
	
	
		System.out.println("hahahaha : "+a);
		
		for(int i=0;i<tankRepository.findAll().size();i++) {
			Tank tank1=tankRepository.findAll().get(i);
			if(tank1.getPoidActuel()==tank1.getPoidVide() && a>=tank1.getPoidVide() && a>0) {
				p=tank1.getPoidActuel();
				tank1.setPoidActuel(tank1.getPoidVide()-tank1.getPoidActuel());
				tankRepository.save(tank1);
				//operation.getTanks().add(tank1);
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank1);
				opt.setQteInsereTank(p*-1);
				operationTankRepository.save(opt);
				a=a-tank1.getPoidVide();
				System.out.println("id tank : "+tank1.getIdTank());
				System.out.println(" a="+a);	
			}
			
			
			if(tank1.getPoidActuel()==tank1.getPoidVide() && a<tank1.getPoidVide() && a>0) {
				
				tank1.setPoidActuel(tank1.getPoidActuel()-a);
				tankRepository.save(tank1);
				//operation.getTanks().add(tank1);
				OperationTank opt=new OperationTank(currentDateTime);
				opt.setOperation(operation);
				opt.setTank(tank1);
				opt.setQteInsereTank(a*-1);
				operationTankRepository.save(opt);
				
				a=0;
				System.out.println("id tank : "+tank1.getIdTank());
				System.out.println(" a="+a);	
				
			}
			
		}
		
		
		
		
		

			for(int i=0;i<tankRepository.findAll().size();i++) {
				Tank tank1=tankRepository.findAll().get(i);
				if(tank1.getPoidActuel()==tank1.getPoidVide() && a>=tank1.getPoidVide() && a>0) {
					p=tank1.getPoidActuel();
					tank1.setPoidActuel(tank1.getPoidVide()-tank1.getPoidActuel());
					tankRepository.save(tank1);
					//operation.getTanks().add(tank1);
					OperationTank opt=new OperationTank(currentDateTime);
					opt.setOperation(operation);
					opt.setTank(tank1);
					opt.setQteInsereTank(p*-1);
					operationTankRepository.save(opt);
					a=a-tank1.getPoidVide();
					System.out.println("id tank : "+tank1.getIdTank());
					System.out.println(" a="+a);	
				}
				
				
				if(tank1.getPoidActuel()==tank1.getPoidVide() && a<tank1.getPoidVide() && a>0) {
					
					tank1.setPoidActuel(tank1.getPoidActuel()-a);
					tankRepository.save(tank1);
					//operation.getTanks().add(tank1);
					OperationTank opt=new OperationTank(currentDateTime);
					opt.setOperation(operation);
					opt.setTank(tank1);
					opt.setQteInsereTank(a*-1);
					operationTankRepository.save(opt);
					
					a=0;
					System.out.println("id tank : "+tank1.getIdTank());
					System.out.println(" a="+a);	
					
				}
				
			}
			
			
			
			
			for(int i=0;i<tankRepository.findAll().size();i++) {
						
						Tank tank2=tankRepository.findAll().get(i);
						
						if(tank2.getPoidActuel()==tank2.getPoidVide()) {
						tank2.setEtat("Remplis");
						tankRepository.save(tank2);
						}
						else if(tank2.getPoidActuel()==0) {
							tank2.setEtat("Vide");
							tank2.setDateIns(null);
							tankRepository.save(tank2);
							}
						else if(tank2.getPoidActuel()<tank2.getPoidVide()) {
							tank2.setEtat("En cours");
							tankRepository.save(tank2);
							}
						
						
					}

		
   // operation.setCode(operation.getCode()+operationRepository.findAll().size());
	return operationRepository.save(operation);
}

	
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.PUT)
	public ResponseEntity<Operation>  EditOperation(@PathVariable Integer idOperation, @RequestBody Operation operation){
		

		
		Operation o=operationRepository.findById(idOperation).get();
		for( int i=0;i<operationRepository.find(idOperation).size();i++) {
			OperationTank opt=operationRepository.find(idOperation).get(i);
			if(idOperation==opt.getOperation().getIdOperation()) {
		
    		Tank t=tankRepository.findById(opt.getTank().getIdTank()).get();
    		System.out.println(t.getIdTank());
    		t.setPoidActuel((t.getPoidActuel()-opt.getQteInsereTank()));
    		tankRepository.save(t);
//			//o.setPoidsLait(operation.getPoidsLait());
			o.setIdOperation(idOperation);
			operationRepository.save(o);
		}
		}
		operationRepository.deleteOpTank(idOperation);
		operationRepository.deleteOp(idOperation);
    	AddOperationRemplissage(operation);
//		o.setPoidsLait(operation.getPoidsLait());
//		o.setDateOperation(operation.getDateOperation());
		
		 return ResponseEntity.ok(operation);
	    }
	
	
	@RequestMapping(value="/operationsR/{idOperation}",method = RequestMethod.PUT)
	public ResponseEntity<Operation>  EditOperationRetrait(@PathVariable Integer idOperation, @RequestBody Operation operation){
		
		Operation o=operationRepository.findById(idOperation).get();
		for( int i=0;i<operationRepository.find(idOperation).size();i++) {
			OperationTank opt=operationRepository.find(idOperation).get(i);
			if(idOperation==opt.getOperation().getIdOperation()) {
		
    		Tank t=tankRepository.findById(opt.getTank().getIdTank()).get();
    		System.out.println(t.getIdTank());
    		t.setPoidActuel((t.getPoidActuel()-opt.getQteInsereTank()));
    		tankRepository.save(t);
//			//o.setPoidsLait(operation.getPoidsLait());
			o.setIdOperation(idOperation);
			operationRepository.save(o);
		}
		}
		operationRepository.deleteOpTank(idOperation);
		operationRepository.deleteOp(idOperation);
    	AddOperationRetrait(operation);
//		o.setPoidsLait(operation.getPoidsLait());
//		o.setDateOperation(operation.getDateOperation());
		
		 return ResponseEntity.ok(operation);
	    }
	
	
	@RequestMapping(value="/operationsTank",method = RequestMethod.GET)
	public List<OperationTank> getOperationsTanks(){
		return operationRepository.findAllOperationsTank();
	}
	
	@RequestMapping(value="/operationsRemplissages",method = RequestMethod.GET)
	public List<Operation> getOperationsRemplissages(){
		return operationRepository.findAllOperationsRemplissages("Remplissage");
	}
	
	@RequestMapping(value="/operationsRetrait",method = RequestMethod.GET)
	public List<Operation> getOperationsRetraits(){
		return operationRepository.findAllOperationsRemplissages("Retrait");
	}
	
	@RequestMapping(value="/operationsTransf",method = RequestMethod.GET)
	public List<Operation> getOperationsTransfs(){
		return operationRepository.findAllOperationsRemplissages("Transformation");
	}


	@RequestMapping(value="/nbreOp",method = RequestMethod.GET)
	public int getNbreOperations(){
		return operationRepository.findAll().size();
	}
	
	
}


