package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Stock  implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idStock;
	private double Poid;
	private double Volume;
	private String Intitule;
	private Date Date_Production;
	private double Quantite;
	
	//constructors 
	
	public Stock(Integer idStock, double poid, double volume, String intitule, Date date_Production, double quantite) {
		super();
		this.idStock = idStock;
		Poid = poid;
		Volume = volume;
		Intitule = intitule;
		Date_Production = date_Production;
		Quantite = quantite;
	}

	public Stock() {
		super();
	}

	//getters and setters 
	//id
	public Integer getIdStock() {
		return idStock;
	}

	public void setIdStock(Integer idStock) {
		this.idStock = idStock;
	}
    //poids
	public double getPoid() {
		return Poid;
	}

	public void setPoid(double poid) {
		Poid = poid;
	}
    //volume
	public double getVolume() {
		return Volume;
	}

	public void setVolume(double volume) {
		Volume = volume;
	}
	//intitule
	public String getIntitule() {
		return Intitule;
	}

	public void setIntitule(String intitule) {
		Intitule = intitule;
	}
	//date production
	public Date getDate_Production() {
		return Date_Production;
	}

	public void setDate_Production(Date date_Production) {
		Date_Production = date_Production;
	}
	//quantite
	public double getQuantite() {
		return Quantite;
	}

	public void setQuantite(double quantite) {
		Quantite = quantite;
	}
	

	
}
