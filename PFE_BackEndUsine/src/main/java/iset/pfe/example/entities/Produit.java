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
		private Set<Lot> lots;
		
		
		public Produit() {
			super();
			// TODO Auto-generated constructor stub
		}
		
		public Produit(String intitule, String libelle) {
			super();
			this.intitule = intitule;
			this.libelle = libelle;
		}
		
		
		
		public Produit(String intitule, String libelle, int qte, Set<Lot> lots) {
			super();
			this.intitule = intitule;
			this.libelle = libelle;
			this.qte = qte;
			this.lots = lots;
		}

		public Produit(String intitule, String libelle, Set<Lot> lots) {
			super();
			this.intitule = intitule;
			this.libelle = libelle;
			this.lots = lots;
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

		public Set<Lot> getLots() {
			return lots;
		}

		public void setLots(Set<Lot> lots) {
			this.lots = lots;
		}

		public int getQte() {
			return qte;
		}

		public void setQte(int qte) {
			this.qte = qte;
		}
		
}
