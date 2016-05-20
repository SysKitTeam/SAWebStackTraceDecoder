using RazorEngine;
using RazorEngine.Templating;
using SAWebStackTraceDecoder.Service.Models;
using SmartAssembly.SDK;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SAWebStackTraceDecoder.Service.Controllers
{
    public class HomeController : ApiController
    {
        [AcceptVerbs("GET", "POST")]
        public HttpResponseMessage Index()
        {
            using (StringWriter writer = new StringWriter())
            {
                Razor.Resolve("Index.cshtml").Run(new ExecuteContext(), writer);

                var response = new HttpResponseMessage();
                response.Content = new StringContent(writer.ToString());
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
                return response;
            }
        }

        [AcceptVerbs("GET", "POST")]
        [Route("Content/{fileName}")]
        public HttpResponseMessage Content(string fileName)
        {
            var paths = new List<string>();

            paths.Add(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "../../Content", fileName));
            paths.Add(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Content", fileName));

            var path = paths.FirstOrDefault(x => File.Exists(x));
            if (path != null)
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                string mediaType;
                if (fileName.EndsWith(".js"))
                {
                    mediaType = "text/javascript";
                }
                else if (fileName.EndsWith(".css"))
                {
                    mediaType = "text/css";
                }
                else
                {
                    mediaType = "text/plain";
                }

                response.Content = new StringContent(File.ReadAllText(path), System.Text.Encoding.UTF8, mediaType);
                return response;
            }

            return null;
        }

        [AcceptVerbs("POST")]
        public string Decode(FormData data)
        {
            try
            {
                return Helpers.DecodeStackTrace(data.Input);
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }
    }
}
