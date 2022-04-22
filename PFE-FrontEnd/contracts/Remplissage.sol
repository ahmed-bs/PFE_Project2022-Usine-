// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Remplissage{
  //******************************************** */
  //coollector remplissage
  //********************************************* */
 struct Usine{
   uint idUsine;
    string nomUsine;
   string adresse;  
   }
   struct Operation0{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
  //string sender;
 // uint tank ;
  Agriculteur0 agriculteur;
  Chef chef;
//Usine usine;
//Tank tank ;
   }
  struct Agriculteur0{
  uint idAgriculteur;
  string nom;
  string prenom;
  string email;
  string adress;  
  uint tel;  
   }
  struct Chef{
  uint idChef;
  string nom;
  string prenom;
  string email;
  string adress;  
  uint tel;  
  uint cin; 
 // uint tank ;
   string username;
  string password; 
   }
      struct OperationTank{
  uint idOpTank;
  uint qteInsereTank;  
   string date;
  Operation0 operation;
  Tank tank ;
   }
     //******************************************** */
  //coollector retrait
  //********************************************* */
      struct OperationTank0{
  uint idOpTank;
  uint qteInsereTank;  
   string date;
  Operation01 operation;
  Tank tank ;
   }
struct Operation01{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
  //string sender;
 // uint tank ;
 // Agriculteur0 agriculteur;
  Chef chef;
Usine usine;
//Tank tank ;
   }
 struct Tank{
  uint idTank;
  string matricule;
  uint poidVide;
  uint poidActuel;
  string etat ;
   }
  //******************************************** */
  // agric
  //********************************************* */
  struct Agriculteur{
  uint idAgriculteur;
  string nom;
  string prenom;
  string username;
  string password; 
   }
   
struct Operation{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
  //string sender;
 // uint tank ;
  Collecteur collecteur; 
  Agriculteur agriculteur;
 
   }
struct Collecteur{
  uint idCollecteur;
  string  nomCollecteur ;
  string adresse ;
  uint  tel;
   }
  //******************************************** */
  //Usine remplissage
  //********************************************* */
    struct OperationTank03{
  uint idOpTank;
  uint qteInsereTank;  
   string date;
  Operation03 operation;
  Tank tank ;
   }

struct Operation03{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
  Centre centreCollecte;
  //Magasin magasin;
   }

struct Centre{
  uint idCentre;
  string nomCentre ;
  string  adresse ;
  string ville ;
   }
  //******************************************** */
  //Usine retrait
  //********************************************* */
struct Magasin{
  uint idMag;
  string nomMag ;
  string  adresse ;
  string ville ;
   }
struct Produit{
  uint idProduit;
  string intitule ;
  string  libelle ;
  uint qte ;
   }
struct Operation02{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
  uint  qtePrise;
  //Centre centreCollecte;
  Magasin magasin;
  Produit produit;

   }








   constructor() {
  }


}
