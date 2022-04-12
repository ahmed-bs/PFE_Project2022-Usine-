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
public class Lot implements Serializable{
	@Id
	@GeneratedValue
	private Integer idL;
//	private String type;
	private int qte;
//	private String description;
	private String date;
	

	@OneToMany(mappedBy="lot",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	@ManyToOne
	@JoinColumn(name="idTank")
	private Tank tank;
	
	@ManyToOne
	@JoinColumn(name="idProduit")
	private Produit produit;
	
	public Lot() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Lot( String date) {
		super();
		this.date = date;
	}
	
	
	public Lot(int qte, String date, Set<Operation> operations, Tank tank, Produit produit) {
		super();
		this.qte = qte;
		this.date = date;
		this.operations = operations;
		this.tank = tank;
		this.produit = produit;
	}
	public Integer getIdL() {
		return idL;
	}
	public void setIdL(Integer idL) {
		this.idL = idL;
	}
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}

	public int getQte() {
		return qte;
	}
	public void setQte(int qte) {
		this.qte = qte;
	}
	public Set<Operation> getOperations() {
		return operations;
	}
	public void setOperations(Set<Operation> operations) {
		this.operations = operations;
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
