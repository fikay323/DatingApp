using API.Contracts;
using API.Data;
using API.Data.Migrations;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplcationService(this IServiceCollection services, IConfiguration config) {

        services.AddControllers();
        services.AddDbContext<DataContext>(opt =>{
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        services.AddScoped<iTokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        return services;
    }
}
