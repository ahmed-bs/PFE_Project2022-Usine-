package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User implements Serializable , UserDetails{
	
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
	

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name="agriculteur_roles" , joinColumns = @JoinColumn(name="idAgriculteur") , inverseJoinColumns=@JoinColumn(name="idRole"))
	@JsonIgnore
	private Set<Role> roles = new HashSet<>();
	
	
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

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	@Override
	public boolean isAccountNonExpired() {
	return false;
	}

	@Override
	public boolean isAccountNonLocked() {
	return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
	return false;
	}

	@Override
	public boolean isEnabled() {
	return false;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<Role> roles = this.getRoles();           
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		            
		            for (Role role : roles) {
		                authorities.add(new SimpleGrantedAuthority(role.getName()));
		            }
		            
		            return authorities;
	}
		
	}
