package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Plateau implements Serializable{
	@Id
	@GeneratedValue
	private Integer idPlateau;
	private int Quantite;
	private Date Date_Emballage;
	
	@ManyToOne
	@JoinColumn(name="idStock")
	private Stock stock;
	
	
	//constructors 
	public Plateau( int quantite, Date date_Emballage) {
		super();
		Quantite = quantite;
		Date_Emballage = date_Emballage;
	}

	

	public Plateau(int quantite, Date date_Emballage, Stock stock) {
		super();
		Quantite = quantite;
		Date_Emballage = date_Emballage;
		this.stock = stock;
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
	public int getQuantite() {
		return Quantite;
	}


	public void setQuantite(int quantite) {
		Quantite = quantite;
	}

	//Date_Emballage
	public Date getDate_Emballage() {
		return Date_Emballage;
	}


	public void setDate_Emballage(Date date_Emballage) {
		Date_Emballage = date_Emballage;
	}


	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}
	
}
