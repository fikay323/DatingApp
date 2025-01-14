using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplcationService(builder.Configuration);

builder.Services.AddCorsService();

builder.Services.AddIdentityService(builder.Configuration);

var app = builder.Build();

app.UseCors("AllowAll"); 

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
