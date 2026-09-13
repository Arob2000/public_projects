import {HasFormatter} from '../interfaces/HasFormatter.js'
export class aPayment implements HasFormatter {
    constructor( 
      readonly reciepient:string,
      private details:string,
      public amount:number,){
      }
      format(){
        return `${this.reciepient} is owed ${this.amount} for ${this.details}`;
      }
   }
   