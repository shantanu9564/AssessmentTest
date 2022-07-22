using DataLayer;
using EntityLayer;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProcessLayer
{
   public class EmployeeProcess
    {
        AssessmentTestDatabaseEntities _db = new AssessmentTestDatabaseEntities();

        public bool SubmitEmployeeMasterData(EmployeeDetailsMasterModel Model)
        {

            if (Model.Id == 0)
            {
                try
                {
                    EmployeeDetailsMaster M = new EmployeeDetailsMaster();


                    M.EmployeeName = Model.EmployeeName;
                    M.EmployeeAddress = Model.EmployeeAddress;
                    M.EmployeeEmail = Model.EmployeeEmail;
                    M.EmployeePhone = Model.EmployeePhone;

                    M.IsActive = true;
                    M.CreatedOn = DateTime.Now;
                    M.IsDelete = false;


                    _db.EmployeeDetailsMasters.Add(M);
                    _db.SaveChanges();

                    return true;
                }
                catch(Exception Ex)
                {
                    return false;
                }
                //finally
                //{
                    
                //}

            }
            else
            {
                try
                {
                    
                    var Data = _db.EmployeeDetailsMasters.Where(a => a.Id == Model.Id).FirstOrDefault();

                    Data.EmployeeName = Model.EmployeeName;
                    Data.EmployeeEmail = Model.EmployeeEmail == "null" ? null : Model.EmployeeEmail;
                    Data.EmployeeAddress = Model.EmployeeAddress == "null" ? null : Model.EmployeeAddress;
                    Data.EmployeePhone = Model.EmployeePhone == "null" ? null : Model.EmployeePhone;
                   

                    _db.Entry(Data).State = EntityState.Modified;                    
                    _db.SaveChanges();
                    return true;

                }
                catch (Exception ex)
                {
                    return false;
                }



            }

        }


        public EmployeeMasterViewModel GetEmployeeList(int PageNo)
        {
            EmployeeMasterViewModel M = new EmployeeMasterViewModel();

            int PageSize = 5;
            
            M.EmployeeList = _db.EmployeeDetailsMasters.OrderByDescending(a => a.Id).Skip((PageNo - 1) * PageSize).Take(PageSize).Select(b=> new EmployeeDetailsMasterModel { Id = b.Id, EmployeeName = b.EmployeeName, EmployeeAddress = b.EmployeeAddress, EmployeeEmail = b.EmployeeEmail, EmployeePhone = b.EmployeePhone }).ToList();

           
            M.TotalRecords = _db.EmployeeDetailsMasters.OrderByDescending(a => a.Id).Count();
            return M;
        }


        public EmployeeDetailsMasterModel EditEmployeeData(int Id)
        {           
            return _db.EmployeeDetailsMasters.Where(a => a.Id == Id).Select(b=> new EmployeeDetailsMasterModel { Id = b.Id, EmployeeName = b.EmployeeName, EmployeeAddress = b.EmployeeAddress, EmployeeEmail = b.EmployeeEmail, EmployeePhone = b.EmployeePhone }).FirstOrDefault();
                       
        }

        public bool DeleteEmployeeData(int Id)
        {
            var Data = _db.EmployeeDetailsMasters.Where(a => a.Id == Id).FirstOrDefault();

            _db.Entry(Data).State = EntityState.Deleted;
            _db.SaveChanges();
            return true;
        }


        public bool DeleteMultipleEmployeeData(List<EmployeeDetailsMasterModel> ConvertDeleteList)
        {
            foreach(var item in ConvertDeleteList)
            {
                var Data = _db.EmployeeDetailsMasters.Where(a => a.Id == item.Id).FirstOrDefault();

                _db.Entry(Data).State = EntityState.Deleted;
                _db.SaveChanges();
            }
           
            return true;
        }
    }
}
