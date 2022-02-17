export const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"].reduce((obj,m,i)=>{
                obj[m]=i;
                return obj;
            },{})