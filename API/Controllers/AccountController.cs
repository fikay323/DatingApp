using System.Security.Cryptography;
using System.Text;
using API.Contracts;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, iTokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>>  Register(RegisterDto registerDto) {
        if (await UserExists(registerDto.Username)) {
            return BadRequest("Username already exists");
        }
        using var hmac = new HMACSHA512();
        var user = new AppUser {
            UserName = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };
        context.Add(user);
        await context.SaveChangesAsync();

        return new UserDto{
            Username = registerDto.Username,
            token = tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {
        var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
        if (user is null) return Unauthorized("Invalid Username");

        var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++) {
            if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        }

        return new UserDto{
            Username = loginDto.Username,
            token = tokenService.CreateToken(user)
        };
    }

    private async Task<bool> UserExists(string username) {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }
}

