using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Live.MiniWebServer.Endpoints;
using Live.MiniWebServer.Services;

namespace Live.MiniWebServer
{
    public static class Runner
    {
        public static async Task Start()
        {
            var builder = Host
                            .CreateDefaultBuilder()
                            .ConfigureWebHostDefaults(webBuilder =>
                            {
                                webBuilder
                                .ConfigureServices(services => { services.AddSingleton<ITodosService, InMemoryTodosService>(); })
                                .UseUrls("https://*:8081", "http://*:8080")
                                .Configure(app =>
                                {
                                    var env = app.ApplicationServices.GetRequiredService<IHostEnvironment>();

                                    if (env.IsDevelopment())
                                        app.UseDeveloperExceptionPage();

                                    app.UseRouting();
                                    app.UseEndpoints(endpoints => { endpoints.MapMessageEndpoints(); });
                                });
                            });

            await builder.Build().RunAsync();
        }
    }
}