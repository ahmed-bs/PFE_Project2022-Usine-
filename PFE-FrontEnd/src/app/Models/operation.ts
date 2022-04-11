import { Centre } from "./centre";
import { Magasin } from "./magasin";
import { Lot } from "./lot";


export class Operation{

    idOperation!: number;
    poidsLait!: number;
    dateOperation!: string;
    typeOp!: string;
    code!:number;
    qtePrise!:number;
    magasin!:Magasin;
    lot!:Lot;
    centreCollecte!:Centre;
    
  }