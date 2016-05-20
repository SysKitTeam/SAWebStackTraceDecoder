using Owin;
using RazorEngine;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SAWebStackTraceDecoder.Service
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();

            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                "Default", "{controller}/{action}",
                new { controller = "Home", action = "Index" });


            TemplateServiceConfiguration templateConfig = new TemplateServiceConfiguration();
            templateConfig.Resolver = new DelegateTemplateResolver(name =>
            {
                string resourcePath = string.Format("SAWebStackTraceDecoder.Service.Views.{0}", name);
                var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourcePath);
                using (StreamReader reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }
            });
            Razor.SetTemplateService(new TemplateService(templateConfig));

            appBuilder.UseWebApi(config);
        }
    }
}
