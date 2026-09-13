import { anInvoice } from './classes/invoice.js';
import { aPayment } from './classes/payment.js';
import { ListTemplate } from './classes/listTemplates.js';
let docOne;
let docTwo;
docOne = new anInvoice('yoshi', 'web work', 250);
docTwo = new aPayment('mario', 'pulmbing work', 200);
let docs = [];
docs.push(docOne);
docs.push(docTwo);
console.log(docs);
const invOne2 = new anInvoice('mario', 'work on the mario website', 250);
const invTwo2 = new anInvoice('lui', 'work on the lui website', 400);
console.log(invOne2, invTwo2);
let invoices2 = [];
invoices2.push(invOne2);
invoices2.push(invTwo2);
invoices2.forEach(inv => {
    // inv.client='sadsa';
    console.log(inv.client, inv.amount, inv.format);
});
const form = document.querySelector('.new-item-form'); // here we did type casting as HTMLForm ELement and we use as we need to make sure the element is present in the dom
// console.log(form.children);
const type = document.querySelector('#type');
const toFrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
//list template instance
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    if (type.value === 'invoice') {
        doc = new anInvoice(toFrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new aPayment(toFrom.value, details.value, amount.valueAsNumber);
    }
    console.log(type.value, toFrom.value, details.value, amount.valueAsNumber);
    list.render(doc, type.value, 'end');
});
