using MyBandTour.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyBandTour.Controllers
{
    public class BandTourController : Controller
    {
        // GET: BandTour
        public ActionResult Start()
        {
            return View();
        }

        public ActionResult Admin()
        {
            if (Session["AUTH"] != null)
            {
                if (Session["AUTH"].ToString() == "SI")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("Start");
                }
            }
            else
            {
                return RedirectToAction("Start");
            }

        }

        public JsonResult Autenticar(string usuario, string contrasena)
        {
            string usuarioBD = "Admin";
            string passBD = "1234";

            if (usuario == usuarioBD && contrasena == passBD)
            {
                Session["AUTH"] = "SI";
                return Json(new { Estado = "Ok" });
            }
            else
            {
                return Json(new { Estado = "No" });
            }

        }

        public JsonResult logout()
        {
            Session.Abandon();
            return Json(new { Estado = "Ok" });
        }

        public JsonResult PrintConcerts()
        {

            MyBandTourEntities2 connection = new MyBandTourEntities2();
            var querry = connection.sp_VerConciertos();
            return Json(new { result = querry }, JsonRequestBehavior.AllowGet);


        }

        public JsonResult CreateConcerts(int BandaId, string Time, string Hour, string country, string dir)
        {

            MyBandTourEntities2 connection = new MyBandTourEntities2();
            var query = connection.sp_CrearConcierto(BandaId, Time, Hour, country, dir);
            return Json(new { result = "Concierto creado exitosamente" }, JsonRequestBehavior.AllowGet);


        }
        /* Al final me dio pereza hacerlo xd
        public JsonResult ModifyConcerts(int ConciertoId, int BandaId, string Time, string Hour, string country, string dir)
        {

            MyBandTourEntities2 connection = new MyBandTourEntities2();
            var querry = connection.sp_ModificarConcierto(ConciertoId, BandaId, Time, Hour, country, dir);
            return Json(new { result = "Concierto modificado exitosamente" }, JsonRequestBehavior.AllowGet);
        }
        */
        public JsonResult DeleteConcerts(int ConciertoId)
        {

            MyBandTourEntities2 connection = new MyBandTourEntities2();
            var query = connection.sp_EliminarConcierto(ConciertoId);
            return Json(new { result = "Concierto eliminado exitosamente" }, JsonRequestBehavior.AllowGet);


        }


    }


}
