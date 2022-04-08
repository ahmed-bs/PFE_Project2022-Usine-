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
public class User implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idU;
	private String nom;
	private String prenom;
	private int Cin;
	private int tel;
	private String username;
	private String password;
	
	@OneToMany(mappedBy="user",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	public User(String nom, String prenom, int cin, int tel, String username, String password) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		Cin = cin;
		this.tel = tel;
		this.username = username;
		this.password = password;
	}
	
	public User(String nom, String prenom, int cin, int tel, String username, String password,
			Set<Operation> operations) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		Cin = cin;
		this.tel = tel;
		this.username = username;
		this.password = password;
		this.operations = operations;
	}



	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Integer getIdRV() {
		return idU;
	}
	public void setIdRV(Integer idU) {
		this.idU = idU;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public int getCin() {
		return Cin;
	}
	public void setCin(int cin) {
		Cin = cin;
	}
	public int getTel() {
		return tel;
	}
	public void setTel(int tel) {
		this.tel = tel;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getIdU() {
		return idU;
	}

	public void setIdU(Integer idU) {
		this.idU = idU;
	}

	public Set<Operation> getOperations() {
		return operations;
	}

	public void setOperations(Set<Operation> operations) {
		this.operations = operations;
	}
	
	
}