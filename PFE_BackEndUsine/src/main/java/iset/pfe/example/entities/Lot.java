//package iset.pfe.example.entities;
//
//import java.io.Serializable;
//import java.util.Set;
//
//import javax.persistence.CascadeType;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToMany;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//@Entity
//public class Lot implements Serializable{
//	@Id
//	@GeneratedValue
//	private Integer idL;
////	private String type;
//	private int qteLot;
//	private int qtePriseTank;
////	private String description;
//	private String date;
//	
//
////	@OneToMany(mappedBy="lot",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
////	@JsonIgnore
////	private Set<Operation> operations;
//	
////	@ManyToOne
////	@JoinColumn(name="idTank")
////	private Tank tank;
//	
////	@ManyToOne
////	@JoinColumn(name="idProduit")
////	private Produit produit;
//	
//	public Lot() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//	public Lot( String date) {
//		super();
//		this.date = date;
//	}
//
//	public Lot(int qteLot, int qtePriseTank, String date) {
//		super();
//		this.qteLot = qteLot;
//		this.qtePriseTank = qtePriseTank;
//		this.date = date;
//	
//	}
//	public Integer getIdL() {
//		return idL;
//	}
//	public void setIdL(Integer idL) {
//		this.idL = idL;
//	}
//	
//	public String getDate() {
//		return date;
//	}
//	public void setDate(String date) {
//		this.date = date;
//	}
//
//	public int getQteLot() {
//		return qteLot;
//	}
//	public void setQteLot(int qteLot) {
//		this.qteLot = qteLot;
//	}
//	public int getQtePriseTank() {
//		return qtePriseTank;
//	}
//	public void setQtePriseTank(int qtePriseTank) {
//		this.qtePriseTank = qtePriseTank;
//	}
//
//	
//}
