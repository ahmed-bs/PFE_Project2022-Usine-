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
public class CentreCollecte  implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idCentre;
	private String nomCentre;
	private String adresse;
	private String ville;
	private int tel;
	
	@OneToMany(mappedBy="centreCollecte",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	public CentreCollecte() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public CentreCollecte(String nomCentre, String adresse, String ville, Set<Operation> operations) {
		super();
		this.nomCentre = nomCentre;
		this.adresse = adresse;
		this.ville = ville;
		this.operations = operations;
	}



	public CentreCollecte(String nomCentre, String adresse, String ville) {
		super();
		this.nomCentre = nomCentre;
		this.adresse = adresse;
		this.ville = ville;
	}
	public Integer getIdCentre() {
		return idCentre;
	}
	public void setIdCentre(Integer idCentre) {
		this.idCentre = idCentre;
	}
	public String getNomCentre() {
		return nomCentre;
	}
	public void setNomCentre(String nomCentre) {
		this.nomCentre = nomCentre;
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
