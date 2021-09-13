using isracardCalculator2.Data;
using isracardCalculator2.Models;
using isracardCalculator2.Operations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace isracardCalculator2.Controllers
{
    public class CalculatorController : Controller
    {
        private AppDbContext db;
        private static readonly string[] operations = new[]{ "+", "-", "*", "/" };
        public CalculatorController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public string[] GetOperations()
        {
            return operations;
        }

        //calculate and save to db
        [HttpPost]
        public JsonResult Create([FromBody] Expression expression)
        {
            double result = expression.Calculate();
            ExpressionEntity e = new ExpressionEntity();
            e.Num1 = expression.Num1;
            e.Num2 = expression.Num2;
            e.Op = expression.Op;
            e.Result = result;
            db.Expressions.Add(e);
            db.SaveChanges();
            return Json(result);                                                                                                                                                         
        }


        //update entity values and save to db
        [HttpPost]
        public JsonResult Update(int id, [FromBody] Expression expression)
        {
            ExpressionEntity exp = db.Expressions.Find(id);
            if (exp == null)
                return Json(new { validID = false });
            exp.Num1 = expression.Num1;
            exp.Num2 = expression.Num2;
            exp.Op = expression.Op;
            exp.Result = expression.Calculate();
            db.Entry(exp).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { validID = true, result = exp.Result });
        }

        //delete an entry from db
        [HttpPost]
        public JsonResult Delete(int id)
        {
            ExpressionEntity exp = db.Expressions.Find(id);
            if (exp == null) 
                return Json(false);
            db.Expressions.Remove(exp);
            db.SaveChanges();
            return Json(true);
        }

        //return list of all data in db in json form
        [HttpPost]
        public JsonResult PopulateHistory()
        {    
            return Json(db.Expressions.ToList());   
        }
   

        //returns appropriate operation object - UNUSED
        /*public IOperation FindOperation(string op)
        {
            if (op == "+") return new Addition();
            else if (op == "-") return new Subtraction();
            else if (op == "*") return new Multiplication();
            else return new Division();
        }
        */



    }
}
