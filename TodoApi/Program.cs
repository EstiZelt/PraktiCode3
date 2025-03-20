using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using TodoApi.Models;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod().AllowAnyHeader();
                      });
});

builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"),
    new MySqlServerVersion(new Version(8, 0, 41)))); // החליפי לגרסה של MySQL שלך


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/items", async(ToDoDbContext db) => {
    return await db.Items.ToListAsync();
});
app.MapPost("/items", async(Item item,ToDoDbContext db) =>
{
    db.Items.Add(item);
    int x=await db.SaveChangesAsync();
    return x;
});
app.MapPut("/items/{id:int}",async(Item item,int id,ToDoDbContext db) =>
{
    var i=await db.Items.FirstOrDefaultAsync(i=>i.Id==id);
    if(i== null)
        return Results.NotFound();
    else 
    {
        if(item.Name!=null)i.Name=item.Name;i.IsComplate=item.IsComplate;
        int x=await db.SaveChangesAsync();
        return Results.Ok(x);
    }
});
app.MapDelete("/items/{id:int}",async(int id,ToDoDbContext db) => {
    var i=await db.Items.FirstOrDefaultAsync(i=>i.Id==id);
    if(i== null)
        return Results.NotFound();
    else 
    {
        db.Items.Remove(i);
        int x=await db.SaveChangesAsync();
        return Results.Ok(x);
    }
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();
