using System;
using API.Entities;

namespace API.Contracts;

public interface iTokenService
{
    string CreateToken(AppUser user);
}
