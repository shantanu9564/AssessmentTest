using EntityLayer;
using Newtonsoft.Json;
using ProcessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AssessmentTest.Controllers
{
    public class DataController : Controller
    {
        // GET: Data
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SubmitEmployeeMasterData(string ModelData)
        {
            var Model = JsonConvert.DeserializeObject<EmployeeDetailsMasterModel>(ModelData);
            var data = new EmployeeProcess().SubmitEmployeeMasterData(Model);
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult GetEmployeeList(int PageNo)
        {           
            var data = new EmployeeProcess().GetEmployeeList(PageNo);
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult EditEmployeeData(int Id)
        {
            var data = new EmployeeProcess().EditEmployeeData(Id);
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult DeleteEmployeeData(int Id)
        {
            var data = new EmployeeProcess().DeleteEmployeeData(Id);
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult DeleteMultipleEmployeeData(string DeleteList)
        {
            var ConvertDeleteList = JsonConvert.DeserializeObject<List<EmployeeDetailsMasterModel>>(DeleteList);
           
            var data = new EmployeeProcess().DeleteMultipleEmployeeData(ConvertDeleteList);
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}