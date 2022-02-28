package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	
	@OneToMany(mappedBy="stock",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Plateau> plateaux;
	
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "stocks")
	@JsonIgnore
    private Set<Tank> tanks= new HashSet<>();
	
	//constructors 
	
	public Stock( double poid, double volume, String intitule, Date date_Production, double quantite) {
		super();
		
		Poid = poid;
		Volume = volume;
		Intitule = intitule;
		Date_Production = date_Production;
		Quantite = quantite;
	}
	

	public Stock(double poid, double volume, String intitule, Date date_Production, double quantite,
			Set<Plateau> plateaux, Set<Tank> tanks) {
		super();
		Poid = poid;
		Volume = volume;
		Intitule = intitule;
		Date_Production = date_Production;
		Quantite = quantite;
		this.plateaux = plateaux;
		this.tanks = tanks;
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


	public Set<Plateau> getPlateaux() {
		return plateaux;
	}


	public void setPlateaux(Set<Plateau> plateaux) {
		this.plateaux = plateaux;
	}


	public Set<Tank> getTanks() {
		return tanks;
	}


	public void setTanks(Set<Tank> tanks) {
		this.tanks = tanks;
	}
	
}
