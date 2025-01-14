using System;

namespace API.Extensions;

public static class CorsServiceExtensions
{
    public static IServiceCollection AddCorsService(this IServiceCollection services) {
       services.AddCors(options => {
            options.AddPolicy("AllowAll", (policy) =>{
                policy.WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
       });
        return services;
    }
}
