using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace SAWebStackTraceDecoder.Service
{
    public partial class Service : ServiceBase
    {
        private IDisposable _server = null;

        public Service()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            StartOptions optionsApi = new StartOptions();
            optionsApi.Urls.Add("http://localhost:9999");
            optionsApi.Urls.Add("http://127.0.0.1:9999");
            optionsApi.Urls.Add(string.Format("http://{0}:9999", Environment.MachineName));

            _server = WebApp.Start<Startup>(optionsApi);
        }

        protected override void OnStop()
        {
            _server.Dispose();
        }
    }
}
