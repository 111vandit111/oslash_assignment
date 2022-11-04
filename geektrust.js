const fs = require("fs")

const filename = process.argv[2]

const items = new Map();

items.set("TSHIRT",[900,100,1]);
items.set("JACKET",[1900,100,1]);
items.set('CAP',[400,100,1]);
items.set('NOTEBOOK',[160,40,2]);
items.set('PENS',[270,30,2]);
items.set('MARKERS',[475,25,2]);

var discount = 0;
var bill = 0;

fs.readFile(filename, "utf8", (err, data) => {
    var inputLines = data.toString().split("\n")
    inputLines.forEach(input => {
        
        const inpline = input.split(" ");

        switch (inpline[0]) {
            case "ADD_ITEM":
                var value = items.get(inpline[1]);
                if(value[2]==1 && inpline[2]>2) {console.log("ERROR_QUANTITY_EXCEEDED"); return}
                else if(value[2]==0 && inpline[2]>3) {console.log("ERROR_QUANTITY_EXCEEDED"); return}
                
                bill = bill+value[0]*inpline[2];

                discount =discount+ value[1]*inpline[2];
                console.log("ITEM_ADDED");
                break;
            case "PRINT_BILL":
              
              if(bill>3000) {
                discount = discount+0.05*bill;
                bill = bill -0.05*bill;
              }

              if(bill<1000) { bill = bill+discount
              discount = 0;  
            }

              bill = bill+0.1*bill;

              console.log(`TOTAL_DISCOUNT: ${discount}`)
              console.log(`TOTAL_AMOUNT_TO_PAY: ${bill}`)
              break;

            default:
                break;
        }
        
        
    });    
})
