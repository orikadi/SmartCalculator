using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace isracardCalculator2
{
    public class Addition : IOperation
    {
        public double Calculate(double num1, double num2)
        {
            return num1 + num2;
        }
        public override string ToString()
        {
            return "+";
        }
    }
}
