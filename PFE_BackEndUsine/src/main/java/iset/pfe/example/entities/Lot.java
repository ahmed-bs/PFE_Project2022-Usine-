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
	private String description;
	private String date;
	
	@ManyToOne
	@JoinColumn(name="idOperation")
	private Operation operation;
	
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
	

	public Lot(String type, String description, String date, Operation operation) {
		super();
		this.type = type;
		this.description = description;
		this.date = date;
		this.operation = operation;
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
	public Operation getOperation() {
		return operation;
	}
	public void setOperation(Operation operation) {
		this.operation = operation;
	}

	
}
