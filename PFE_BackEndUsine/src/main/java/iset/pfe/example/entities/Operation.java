package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Operation implements Serializable{
	@Id
	@GeneratedValue
	private Integer idOperation;
	private double poidsLait;
	private String dateOperation;
	private String typeOp;
	private Integer code;
	private int qtePrise;	
	
	
	@ManyToOne
	@JoinColumn(name="idU")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="idMage")
	private Magasin magasin;
	
	@ManyToOne
	@JoinColumn(name="idTank")
	private Tank tank;
	
	@ManyToOne
	@JoinColumn(name="idCentre")
	private CentreCollecte centreCollecte;
	
	@ManyToOne
	@JoinColumn(name="idP")
	private Produit produit;
	
	@OneToMany(mappedBy="operation",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<OperationTank> operationstank;
	
	
	
	public Operation() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Operation(double poidsLait, String dateOperation, String typeOp, Integer code, int qtePrise, User user,
			Magasin magasin, Tank tank, CentreCollecte centreCollecte, Produit produit,
			Set<OperationTank> operationstank) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.code = code;
		this.qtePrise = qtePrise;
		this.user = user;
		this.magasin = magasin;
		this.tank = tank;
		this.centreCollecte = centreCollecte;
		this.produit = produit;
		this.operationstank = operationstank;
	}


	public Operation(double poidsLait, String dateOperation, String typeOp, Integer code) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.code = code;
	}


	public Integer getIdOperation() {
		return idOperation;
	}
	public void setIdOperation(Integer idOperation) {
		this.idOperation = idOperation;
	}
	public double getPoidsLait() {
		return poidsLait;
	}
	public void setPoidsLait(double poidsLait) {
		this.poidsLait = poidsLait;
	}
	public String getDateOperation() {
		return dateOperation;
	}
	public void setDateOperation(String dateOperation) {
		this.dateOperation = dateOperation;
	}
	public String getTypeOp() {
		return typeOp;
	}
	public void setTypeOp(String typeOp) {
		this.typeOp = typeOp;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Magasin getMagasin() {
		return magasin;
	}


	public void setMagasin(Magasin magasin) {
		this.magasin = magasin;
	}


	public CentreCollecte getCentreCollecte() {
		return centreCollecte;
	}


	public void setCentreCollecte(CentreCollecte centreCollecte) {
		this.centreCollecte = centreCollecte;
	}


	public Set<OperationTank> getOperationstank() {
		return operationstank;
	}


	public void setOperationstank(Set<OperationTank> operationstank) {
		this.operationstank = operationstank;
	}


	public int getQtePrise() {
		return qtePrise;
	}

	public void setQtePrise(int qtePrise) {
		this.qtePrise = qtePrise;
	}


	public Tank getTank() {
		return tank;
	}


	public void setTank(Tank tank) {
		this.tank = tank;
	}


	public Produit getProduit() {
		return produit;
	}


	public void setProduit(Produit produit) {
		this.produit = produit;
	}
	
}
