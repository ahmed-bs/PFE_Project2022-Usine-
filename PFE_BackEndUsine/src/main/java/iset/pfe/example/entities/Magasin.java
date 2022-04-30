package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Magasin implements Serializable{
	@Id
	@GeneratedValue
	private Integer idMag;
	private String nomMag;
	private String adresse;
	private String ville;
	private int tel;
	
	@OneToMany(mappedBy="magasin",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	public Magasin() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Magasin(String nomMag, String adresse, String ville) {
		super();
		this.nomMag = nomMag;
		this.adresse = adresse;
		this.ville = ville;
	}

	public Magasin(String nomMag, String adresse, String ville, Set<Operation> operations) {
		super();
		this.nomMag = nomMag;
		this.adresse = adresse;
		this.ville = ville;
		this.operations = operations;
	}


	public Integer getIdMag() {
		return idMag;
	}


	public void setIdMag(Integer idMag) {
		this.idMag = idMag;
	}


	public String getNomMag() {
		return nomMag;
	}


	public void setNomMag(String nomMag) {
		this.nomMag = nomMag;
	}


	public String getAdresse() {
		return adresse;
	}


	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}


	public String getVille() {
		return ville;
	}


	public void setVille(String ville) {
		this.ville = ville;
	}


	public Set<Operation> getOperations() {
		return operations;
	}


	public void setOperations(Set<Operation> operations) {
		this.operations = operations;
	}


	public int getTel() {
		return tel;
	}


	public void setTel(int tel) {
		this.tel = tel;
	}
	
	
}
