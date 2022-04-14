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
public class Produit implements Serializable{
		
		@Id
		@GeneratedValue
		private Integer idProduit;
		private String intitule;
		private String libelle;
		private int qte;
		
		@OneToMany(mappedBy="produit",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
		@JsonIgnore
		private Set<Operation> operations;
		
//		@OneToMany(mappedBy="produit",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
//		@JsonIgnore
//		private Set<Lot> lots;
		
		
		public Produit() {
			super();
			// TODO Auto-generated constructor stub
		}
		
		public Produit(String intitule, String libelle) {
			super();
			this.intitule = intitule;
			this.libelle = libelle;
		}
		
		public Produit(String intitule, String libelle, int qte) {
			super();
			this.intitule = intitule;
			this.libelle = libelle;
			this.qte = qte;
		}



		public Produit(String intitule, String libelle, int qte, Set<Operation> operations) {
			super();
			this.intitule = intitule;
			this.libelle = libelle;
			this.qte = qte;
			this.operations = operations;
		}

		public Integer getIdProduit() {
			return idProduit;
		}
		public void setIdProduit(Integer idProduit) {
			this.idProduit = idProduit;
		}
		public String getIntitule() {
			return intitule;
		}
		public void setIntitule(String intitule) {
			this.intitule = intitule;
		}
		public String getLibelle() {
			return libelle;
		}
		public void setLibelle(String libelle) {
			this.libelle = libelle;
		}

		public int getQte() {
			return qte;
		}

		public void setQte(int qte) {
			this.qte = qte;
		}

		public Set<Operation> getOperations() {
			return operations;
		}

		public void setOperations(Set<Operation> operations) {
			this.operations = operations;
		}
		
}
