using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace isracardCalculator2
{
    public class Expression
    {

        public double Num1 {get; set;} 
        public double Num2 { get; set; }
        //public IOperation Op { get; set; }
        public string Op { get; set; }

        public double Calculate()
        {
            if (Op == "+")
            {
                return Num1 + Num2;
            }
            else if (Op == "-")
            {
                return Num1 - Num2;
            }
            else if (Op == "*")
            {
                return Num1 * Num2;
            }
            else // divide
            {
                return Num1 / Num2;
            }
        }
        /*
         * public double Calculate()
         {
             return Op.Calculate(Num1, Num2);
         }
        */
    }

}