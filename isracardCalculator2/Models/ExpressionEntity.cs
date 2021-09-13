using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace isracardCalculator2.Models
{
    public class ExpressionEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public double Num1 { get; set; }
        [Required]
        public double Num2 { get; set; }
        [Required]
        public string Op { get; set; }
        [Required]
        public double Result { get; set; }

    }
}
