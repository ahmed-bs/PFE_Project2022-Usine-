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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Tank implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idTank;
	private double Poid;
	private double Volume;
	private Date Date_Arrivee;
	
	@ManyToOne
	@JoinColumn(name="idChef")
	private Chef chef;
	
	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name="stock_tank" , joinColumns = @JoinColumn(name="idTank") , inverseJoinColumns=@JoinColumn(name="idStock"))
	@JsonIgnore
	private Set<Stock> stocks= new HashSet<>();
	
	
	public Tank() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public Tank(double poid, double volume, Date date_Arrivee) {
		super();
		Poid = poid;
		Volume = volume;
		Date_Arrivee = date_Arrivee;
	}
	
	
	public Tank(double poid, double volume, Date date_Arrivee, Chef chef, Set<Stock> stocks) {
		super();
		Poid = poid;
		Volume = volume;
		Date_Arrivee = date_Arrivee;
		this.chef = chef;
		this.stocks = stocks;
	}


	public Integer getIdTank() {
		return idTank;
	}
	public void setIdTank(Integer idTank) {
		this.idTank = idTank;
	}
	public double getPoid() {
		return Poid;
	}
	public void setPoid(double poid) {
		Poid = poid;
	}
	public double getVolume() {
		return Volume;
	}
	public void setVolume(double volume) {
		Volume = volume;
	}
	public Date getDate_Arrivee() {
		return Date_Arrivee;
	}
	public void setDate_Arrivee(Date date_Arrivee) {
		Date_Arrivee = date_Arrivee;
	}


	public Chef getChef() {
		return chef;
	}


	public void setChef(Chef chef) {
		this.chef = chef;
	}


	public Set<Stock> getStocks() {
		return stocks;
	}


	public void setStocks(Set<Stock> stocks) {
		this.stocks = stocks;
	}
	
}