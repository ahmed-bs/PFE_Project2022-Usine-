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
	private String type;
	private int qte;
	private String description;
	private String date;
	

	@OneToMany(mappedBy="lot",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	
	public Lot() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Lot(String type, String description, String date) {
		super();
		this.type = type;
		this.description = description;
		this.date = date;
	}
	
	
	public Lot(String type, int qte, String description, String date, Set<Operation> operations) {
		super();
		this.type = type;
		this.qte = qte;
		this.description = description;
		this.date = date;
		this.operations = operations;
	}
	public Integer getIdL() {
		return idL;
	}
	public void setIdL(Integer idL) {
		this.idL = idL;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
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

	
}
