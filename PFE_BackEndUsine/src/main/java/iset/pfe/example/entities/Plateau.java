package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Plateau implements Serializable{
	@Id
	@GeneratedValue
	private Integer idPlateau;
	private double Quantite;
	private Date Date_Emballage;
	
	
	//constructors 
	public Plateau(Integer idPlateau, double quantite, Date date_Emballage) {
		super();
		this.idPlateau = idPlateau;
		Quantite = quantite;
		Date_Emballage = date_Emballage;
	}


	public Plateau() {
		super();
	}
	
	//getters and setters 
	
	//id
	public Integer getIdPlateau() {
		return idPlateau;
	}


	public void setIdPlateau(Integer idPlateau) {
		this.idPlateau = idPlateau;
	}
	
	//Quantite
	public double getQuantite() {
		return Quantite;
	}


	public void setQuantite(double quantite) {
		Quantite = quantite;
	}

	//Date_Emballage
	public Date getDate_Emballage() {
		return Date_Emballage;
	}


	public void setDate_Emballage(Date date_Emballage) {
		Date_Emballage = date_Emballage;
	}
	

}
