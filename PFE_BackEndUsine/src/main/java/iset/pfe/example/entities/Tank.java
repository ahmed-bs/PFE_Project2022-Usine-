package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Tank implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idTank;
	private double Poid;
	private double Volume;
	private Date Date_Arrivee;
	
	
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
	
}