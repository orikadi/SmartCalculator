using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace isracardCalculator2
{
    public interface IOperation
    {
        public double Calculate(double num1, double num2);
        public string ToString();
    }
}
